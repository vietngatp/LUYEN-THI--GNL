export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
    maxDuration: 60,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fileData, mimeType, targetType = 'bank', subject = 'T', examCode = '01', apiKey } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Chưa nhận được tệp đề thi tải lên.' });
    }

    const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Chưa có Gemini API Key.' });
    }

    let cleanBase64 = fileData;
    if (fileData.includes(';base64,')) {
      cleanBase64 = fileData.split(';base64,')[1];
    }

    const isPractice = targetType === 'practice';

    const promptText = `Bạn là chuyên gia thẩm định và chuẩn hóa đề thi Đánh giá năng lực (HSA) theo CT GDPT 2018.
Nhiệm vụ: Phân tích và trích xuất câu hỏi từ tài liệu được tải lên.
Mục tiêu nạp: ${isPractice ? 'NGÂN HÀNG CÂU HỎI LUYỆN TẬP' : 'NGÂN HÀNG ĐỀ GỐC NGUYÊN MẪU'}.

Yêu cầu định dạng bắt buộc:
1. Chuyển TẤT CẢ công thức toán học/khoa học sang định dạng LaTeX chuẩn đặt trong cặp dấu $...$ (inline) hoặc $$...$$ (display).
2. Quy định thoát chuỗi: Mọi dấu gạch chéo ngược trong công thức LaTeX PHẢI được escape 2 lần trong chuỗi JSON (ví dụ: \\frac, \\sqrt, \\alpha).
3. Giữ nguyên 100% ngữ nghĩa tiếng Việt, thứ tự câu hỏi và phương án A, B, C, D.
4. Nếu câu hỏi có hình ảnh/đồ thị/bảng biến thiên, đặt ký hiệu [HINH_ANH] vào đúng vị trí câu và đặt hasImage = true.
5. Gắn mã ID:
   ${isPractice 
     ? `- Gắn mã định danh theo chuẩn: ${subject}${examCode}-[stt]LT (Ví dụ: ${subject}${examCode}-01LT, ${subject}${examCode}-02LT,...)
- Phân loại chuyên đề bám sát Chương trình GDPT 2018 vào trường "topic".
- Đánh giá độ khó chính xác vào trường "level": B (Biết - 25%), H (Hiểu - 30%), VD (Vận dụng - 30%), VDC (Vận dụng cao - tối đa 14%).`
     : `- Gắn mã định danh: ${subject}${examCode}-01, ${subject}${examCode}-02,...
- Đánh giá độ khó vào trường "level": B, H, VD, VDC.`}
6. TUYỆT ĐỐI KHÔNG sinh câu hỏi biến thể/tương đương để tiết kiệm token và đảm bảo tính nguyên bản.

Trả về kết quả DUY NHẤT dưới dạng JSON hợp lệ (không kèm giải thích markdown thừa):
{
  "questions": [
    {
      "id": "${subject}${examCode}-01${isPractice ? 'LT' : ''}",
      "subject": "${subject}",
      "topic": "${isPractice ? 'Tên chuyên đề CT GDPT 2018' : 'Tổng hợp'}",
      "content": "Nội dung câu hỏi kèm KaTeX $...$ và [HINH_ANH] nếu có",
      "hasImage": false,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "level": "H",
      "solution": "Lời giải tóm tắt (nếu có)"
    }
  ]
}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inline_data: {
                  mime_type: mimeType || 'application/pdf',
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.1,
          max_output_tokens: 8192
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status || 500).json({ error: JSON.stringify(data.error || data) });
    }

    const candidate = data.candidates?.[0];
    if (candidate?.finishReason === 'MAX_TOKENS') {
      return res.status(400).json({
        error: 'Đề thi quá dài khiến phản hồi bị tràn giới hạn token. Hãy chia nhỏ đề thi thành 15-20 câu mỗi lần tải.'
      });
    }

    const text = candidate?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(500).json({ error: 'AI không trả về dữ liệu nội dung.' });
    }

    let cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();

    try {
      const parsedData = JSON.parse(cleanJson);
      return res.status(200).json(parsedData);
    } catch (parseError) {
      const lastBrace = cleanJson.lastIndexOf('}');
      if (lastBrace !== -1) {
        const recovered = cleanJson.substring(0, lastBrace + 1) + ']}';
        try {
          return res.status(200).json(JSON.parse(recovered));
        } catch (e) {}
      }
      return res.status(500).json({
        error: 'Lỗi chuỗi JSON chưa hoàn chỉnh từ AI. Hãy giảm bớt số lượng câu hỏi trong file nạp.'
      });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Lỗi xử lý serverless.' });
  }
}
