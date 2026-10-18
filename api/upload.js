export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
    // Tăng thời gian phản hồi tối đa trên Vercel Pro nếu có (tối đa 60s trên gói Hobby)
    maxDuration: 60,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fileData, mimeType, subject = 'T', examCode = '01', apiKey } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Chưa nhận được tệp tải lên' });
    }

    const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Chưa cấu hình Gemini API Key.' });
    }

    // 1. Chuẩn hóa Base64: Lọc bỏ tiền tố "data:...;base64," nếu client gửi lên
    let cleanBase64 = fileData;
    if (fileData.includes(';base64,')) {
      cleanBase64 = fileData.split(';base64,')[1];
    }

    // 2. Kiểm tra định dạng hỗ trợ (Word cần chuyển sang PDF trước ở Client)
    let safeMimeType = mimeType || 'application/pdf';
    if (safeMimeType.includes('word') || safeMimeType.includes('officedocument')) {
      return res.status(400).json({
        error: 'Gemini API hiện chưa hỗ trợ trực tiếp file .doc/.docx qua inline_data. Vui lòng xuất đề sang PDF hoặc file ảnh trước khi tải lên.'
      });
    }

    const promptText = `Bạn là chuyên gia thẩm định và số hóa đề thi Đánh giá năng lực (HSA).
Nhiệm vụ: Trích xuất chính xác các câu hỏi từ tài liệu được cung cấp (PDF/Ảnh) theo cấu trúc chuẩn.

Yêu cầu định dạng:
1. Chuyển TẤT CẢ công thức toán học/khoa học sang định dạng LaTeX chuẩn, đặt trong cặp dấu $...$ (ví dụ: $d: 2x - y + 3 = 0$, $\\int_0^1 f(x)dx$).
2. Giữ nguyên 100% ngữ nghĩa tiếng Việt, thứ tự câu và các đáp án A, B, C, D.
3. Nếu câu hỏi có hình vẽ, đồ thị hoặc bảng biến thiên, bắt buộc chèn ký hiệu [HINH_ANH] vào đúng vị trí của câu hỏi và đặt "hasImage": true.
4. Gắn mã câu hỏi: ${subject}${examCode}-01, ${subject}${examCode}-02,...
5. KHÔNG sinh câu hỏi tương đương ở bước này để tránh lỗi quá tải token và timeout. Chỉ tập trung bóc tách chuẩn xác toàn bộ câu gốc trong đề.

Cấu trúc JSON đầu ra bắt buộc:
{
  "questions": [
    {
      "id": "${subject}${examCode}-01",
      "subject": "${subject}",
      "content": "Nội dung câu hỏi có kèm KaTeX $...$ và [HINH_ANH] nếu có",
      "hasImage": false,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "level": "TH",
      "solution": "Lời giải chi tiết nếu có trong tài liệu"
    }
  ]
}`;

    // 3. Sử dụng model chuẩn đang hoạt động ổn định: gemini-2.5-flash hoặc gemini-1.5-flash
    const MODEL_NAME = 'gemini-2.5-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

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
                  mime_type: safeMimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.1,
          max_output_tokens: 8192
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || JSON.stringify(data)
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(500).json({ error: 'AI không trả về nội dung bóc tách.' });
    }

    // 4. Parse JSON an toàn
    const cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return res.status(200).json(parsedData);

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Lỗi xử lý máy chủ nội bộ' });
  }
}
