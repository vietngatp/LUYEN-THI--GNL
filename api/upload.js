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
    const { fileData, mimeType, subject, examCode, apiKey } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Chưa nhận được tệp tải lên' });
    }

    const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Chưa có Gemini API Key.' });
    }

    const promptText = `Bạn là chuyên gia thẩm định đề thi ĐGNL HSA. Đọc tài liệu đề thi đính kèm (Word/PDF/Ảnh) và trích xuất toàn bộ câu hỏi. 
QUAN TRỌNG: 
1. TẤT CẢ các ký hiệu toán học, phân số, biến số, hàm số, biểu thức, ký hiệu hình học (như f(x), \int, \frac, x^2, AB, \vec{u},...) BẮT BUỘC phải được đặt trong dấu đô la đơn (ví dụ: $f(x)$, $\int_{0}^{1} f(x)dx$, $\frac{a}{b}$). Tuyệt đối không để chữ toán học dạng text thuần mà không có dấu $...$.
2. Giữ nguyên 100% câu chữ tiếng Việt và thứ tự đề bài.
3. Nếu có hình vẽ, đồ thị, bảng biến thiên, hãy chèn thẻ [HINH_ANH] vào đúng vị trí của câu.
4. Gắn mã: ${subject}${examCode}-01, ${subject}${examCode}-02...
5. Xác định mức độ khó (B: Biết, H: Hiểu, VD: Vận dụng, VDC: Vận dụng cao).

Trả về kết quả DUY NHẤT dưới dạng JSON cấu trúc sau:
{
  "questions": [
    {
      "id": "${subject}${examCode}-01",
      "subject": "${subject}",
      "content": "Nội dung câu hỏi kèm $...$ đầy đủ công thức và [HINH_ANH] nếu có",
      "hasImage": true,
      "options": ["A. $...$", "B. $...$", "C. $...$", "D. $...$"],
      "correctIndex": 0,
      "level": "VD"
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
                  data: fileData
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.1
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: JSON.stringify(data.error || data) });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return res.status(200).json(JSON.parse(cleanJson));

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
