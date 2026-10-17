export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fileData, fileName, mimeType, subject, examCode, apiKey } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Chưa nhận được tệp tải lên' });
    }

    const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Chưa cấu hình Gemini API Key.' });
    }

    const systemPrompt = `Bạn là Hội đồng chuyên gia thẩm định đề thi ĐGNL HSA Model và Chương trình GDPT 2018.
Nhiệm vụ: Đọc và phân tích tài liệu đề thi được tải lên (Word, PDF, hoặc Ảnh).

YÊU CẦU BẮT BUỘC:
1. Đọc tài liệu, nhận diện TẤT CẢ câu hỏi, công thức toán học (kể cả MathType, Equation).
2. TỰ ĐỘNG CHUYỂN ĐỔI MỌI CÔNG THỨC TOÁN HỌC sang định dạng LaTeX chuẩn kẹp giữa cặp dấu $...$ (nội dòng) hoặc $$...$$ (khối). Ví dụ: $d: 2x - y + 3 = 0$, $\\vec{u} = (1; 2)$, $\\frac{a}{b}$, $\\sqrt{x}$, $\\int_{a}^{b}$.
3. Giữ nguyên 100% câu chữ tiếng Việt, không tóm tắt, không làm biến dạng câu hỏi gốc.
4. Nếu câu hỏi có đồ thị, hình vẽ, bảng biến thiên, hãy chèn thẻ [HINH_ANH] vào đúng vị trí hình vẽ trong câu.
5. Gắn mã định danh cho từng câu: [MãMôn][MãĐề]-[STT] (Ví dụ: Môn ${subject}, Mã đề ${examCode} -> câu 1 là ${subject}${examCode}-01, câu 2 là ${subject}${examCode}-02...).
6. Phân tích độ khó (B, H, VD, VDC), đưa ra lời giải tối ưu chi tiết cho từng câu.
7. Với mỗi câu gốc, tự động sinh 3 câu tương đương cùng chuyên đề và độ khó, mã dạng [MãGốc]1, [MãGốc]2, [MãGốc]3.

HÃY TRẢ VỀ DỮ LIỆU ĐÚNG ĐỊNH DẠNG JSON DUY NHẤT theo cấu trúc:
{
  "questions": [
    {
      "id": "${subject}${examCode}-01",
      "subject": "${subject}",
      "content": "Nội dung câu hỏi kèm công thức LaTeX $...$ và thẻ [HINH_ANH] nếu có",
      "hasImage": true,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "level": "VD",
      "solution": "Lời giải chi tiết chuẩn xác",
      "variants": [
        { "id": "${subject}${examCode}-011", "content": "Đề bài câu tương đương 1", "options": ["A", "B", "C", "D"], "correctIndex": 0 },
        { "id": "${subject}${examCode}-012", "content": "Đề bài câu tương đương 2", "options": ["A", "B", "C", "D"], "correctIndex": 1 },
        { "id": "${subject}${examCode}-013", "content": "Đề bài câu tương đương 3", "options": ["A", "B", "C", "D"], "correctIndex": 2 }
      ]
    }
  ]
}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            {
              inline_data: {
                mime_type: mimeType || 'application/pdf',
                data: fileData
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        response_mime_type: "application/json"
      }
    };

    // Sử dụng endpoint chuẩn xác tương thích 100% với khóa Google AI Studio mới
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const apiResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      return res.status(500).json({ error: 'Lỗi từ Gemini AI API: ' + errText });
    }

    const data = await apiResponse.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return res.status(500).json({ error: 'AI không trả về nội dung' });
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(candidateText);
    } catch (parseErr) {
      const cleanJson = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleanJson);
    }

    return res.status(200).json(parsedResult);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Lỗi xử lý server: ' + error.message });
  }
}
