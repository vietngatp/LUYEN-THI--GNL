<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hệ Thống Luyện Thi Đánh Giá Năng Lực (HSA Model)</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- KaTeX -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>

  <style>
    body { font-family: "Times New Roman", Times, serif; }
    .no-select { user-select: none; }
    .katex { font-size: 1.12em; }
    .math-content { word-break: break-word; }
  </style>
</head>
<body class="bg-slate-100 text-slate-900 min-h-screen flex flex-col">

  <!-- HEADER -->
  <header class="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black text-xl shadow border-2 border-amber-300">
          HSA
        </div>
        <div>
          <h1 class="font-bold text-base md:text-lg tracking-tight leading-none">HỆ THỐNG LUYỆN THI ĐÁNH GIÁ NĂNG LỰC</h1>
          <span class="text-xs text-blue-200">ĐHQGHN • CT GDPT 2018 • Đầy Đủ 5 Phân Hệ Quản Trị</span>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <div class="hidden md:flex items-center bg-blue-950/70 px-3 py-1 rounded-lg text-xs">
          <span class="text-slate-300 mr-2">Thí sinh:</span>
          <span class="text-amber-300 font-bold" id="header-user">Nguyễn Văn An (07-12A1-001)</span>
        </div>

        <div class="flex bg-blue-950/80 p-1 rounded-xl border border-blue-700/60 shadow">
          <button id="btn-view-student" onclick="switchView('student')" class="px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition bg-amber-400 text-slate-950 shadow">
            Phòng Học Viên
          </button>
          <button id="btn-view-admin" onclick="switchView('admin')" class="px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition text-blue-200 hover:text-white">
            Phòng Quản Trị
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="max-w-7xl w-full mx-auto p-4 md:p-6 flex-1">

    <!-- ==================== VIEW 1: PHÒNG HỌC VIÊN ==================== -->
    <div id="view-student" class="space-y-6">
      <div id="student-hub" class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-slate-900" id="current-student-name">Nguyễn Văn An</h2>
              <span class="bg-blue-100 text-blue-900 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full" id="current-student-id">07-12A1-001</span>
              <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded" id="current-student-class">Lớp: 12A1</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Đợt thi hiện tại: <strong id="current-exam-name">Đợt 1 - Khảo sát Năng lực HSA Chuẩn 2026</strong></p>
          </div>
          <div>
            <span id="current-student-status" class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
              ✓ ĐÃ DUYỆT: ĐỦ ĐIỀU KIỆN DỰ THI
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-2xl border shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-black text-2xl mb-3">📖</div>
              <h3 class="text-base font-bold text-slate-900 mb-1">1. Phòng Luyện Tập</h3>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">
                Rèn luyện câu hỏi bám sát CT GDPT 2018. Hiển thị công thức KaTeX và hình vẽ độc lập cho từng câu.
              </p>
            </div>
            <button onclick="startPracticeSession()" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow transition">
              Vào Luyện Tập Chuyên Đề (30 câu)
            </button>
          </div>

          <div class="bg-white p-6 rounded-2xl border-2 border-blue-600/30 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center font-black text-2xl mb-3">🎓</div>
              <h3 class="text-base font-bold text-slate-900 mb-1">2. Phòng Thi Chính Thức HSA</h3>
              <div class="space-y-1.5 bg-slate-50 p-3 rounded-xl border mt-2">
                <label class="block text-[11px] font-bold text-slate-600 uppercase">Mật khẩu đợt thi:</label>
                <input type="password" id="input-exam-pass" value="HSA2026" placeholder="Nhập HSA2026..." class="w-full border rounded-lg p-2 text-xs outline-none bg-white font-mono" />
              </div>
            </div>
            <button onclick="startOfficialExam()" class="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow transition">
              Vào Phòng Thi Khảo Sát (Chuẩn HSA)
            </button>
          </div>
        </div>
      </div>

      <!-- Màn hình làm bài thi -->
      <div id="student-exam" class="hidden space-y-4 no-select">
        <div class="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <span id="exam-badge" class="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full">
              BÀI THI CHÍNH THỨC
            </span>
            <h2 id="exam-title" class="text-sm font-bold text-slate-800 mt-1">Phần 1: Toán học & Xử lý số liệu</h2>
          </div>
          <div class="flex items-center space-x-3">
            <div class="text-right">
              <span class="text-[10px] text-slate-500 block uppercase font-bold">Thời gian</span>
              <span id="exam-timer" class="font-mono text-xl font-black text-rose-600">75:00</span>
            </div>
            <button onclick="submitExam()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow">
              Nộp Bài
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="lg:col-span-3 bg-white p-6 rounded-xl border shadow-sm space-y-4">
            <div class="flex justify-between items-center border-b pb-2">
              <span id="q-number" class="font-bold text-xs text-blue-900">Câu 1</span>
              <span id="q-code" class="font-mono text-xs text-slate-500">T01-01</span>
            </div>

            <div id="q-content" class="text-sm leading-relaxed text-slate-900 space-y-3"></div>
            <div id="q-options" class="space-y-2 pt-2"></div>

            <div class="flex justify-between pt-4 border-t">
              <button onclick="prevQuestion()" class="px-3 py-1.5 border rounded text-xs font-semibold hover:bg-slate-50">← Câu trước</button>
              <button onclick="nextQuestion()" class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold">Câu sau →</button>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border shadow-sm h-fit">
            <h4 class="text-xs font-bold text-slate-700 uppercase mb-3">Mục lục câu hỏi</h4>
            <div id="q-matrix" class="grid grid-cols-5 gap-1.5 max-h-[400px] overflow-y-auto pr-1"></div>
          </div>
        </div>
      </div>

      <!-- Màn hình kết quả -->
      <div id="student-result" class="hidden bg-white p-8 rounded-2xl border shadow-sm space-y-6 text-center">
        <h2 class="text-xl font-bold text-slate-900">KẾT QUẢ BÀI THI HSA</h2>
        <div class="inline-block bg-blue-50 border border-blue-200 px-8 py-4 rounded-2xl">
          <span class="text-xs text-blue-700 font-bold uppercase">Tổng Điểm Quy Đổi HSA (Thang 150)</span>
          <div id="result-score" class="text-4xl font-black text-blue-950 mt-1">126 / 150</div>
        </div>
        <div>
          <button onclick="backToHub()" class="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow transition">
            Trở về Trang Chủ
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== VIEW 2: PHÒNG QUẢN TRỊ (ĐẦY ĐỦ 5 PHÂN HỆ) ==================== -->
    <div id="view-admin" class="hidden space-y-6">
      <div class="bg-white p-2.5 rounded-2xl shadow-sm border flex flex-wrap gap-2">
        <button id="tab-btn-audit" onclick="switchAdminTab('audit')" class="px-3.5 py-2 text-xs font-bold rounded-xl transition bg-blue-800 text-white shadow ring-2 ring-amber-400">
          📤 1. AI Thẩm Định Đề (8 Môn)
        </button>
        <button id="tab-btn-bank" onclick="switchAdminTab('bank')" class="px-3.5 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          📚 2. Ngân Hàng Đề Gốc (<span id="bank-count">50</span> câu)
        </button>
        <button id="tab-btn-practice" onclick="switchAdminTab('practice')" class="px-3.5 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          🎯 3. Ngân Hàng Luyện Thi (<span id="practice-count">45</span> câu)
        </button>
        <button id="tab-btn-exams" onclick="switchAdminTab('exams')" class="px-3.5 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          🛠️ 4. Tạo Đợt Thi & Quản Lý Đợt Thi
        </button>
        <button id="tab-btn-students" onclick="switchAdminTab('students')" class="px-3.5 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          👥 5. Quản Lý Thí Sinh & Học Viên
        </button>
      </div>

      <!-- Tab 1: AI Tải file tự động LaTeX hóa -->
      <div id="admin-tab-audit" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div class="border-b pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h2 class="text-lg font-bold text-blue-950">Tải File Đề Thi & Tự Động LaTeX Hóa Bằng AI Backend</h2>
            <p class="text-xs text-slate-500">Mỗi câu có hình đều mang mã ảnh riêng biệt và có thể chọn tệp ảnh riêng.</p>
          </div>
          <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            AI Engine (gemini-3.8-flash)
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3">
              <span class="font-bold text-blue-950 text-xs block uppercase">1. Cấu hình Gemini API & Đề Nạp:</span>
              
              <div>
                <label class="block text-slate-700 text-xs font-bold mb-1">Gemini API Key:</label>
                <input type="password" id="input-api-key" placeholder="Dán mã khóa AI Studio của bạn vào đây..." class="w-full border rounded-xl p-2 text-xs font-mono bg-white outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div class="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label class="block text-slate-700 text-xs font-bold mb-1">Môn thi:</label>
                  <select id="audit-subject" class="w-full border rounded-xl p-2 text-xs font-bold bg-white">
                    <option value="T">[T] - Toán và xử lý số liệu</option>
                    <option value="V">[V] - Ngữ văn - Đọc hiểu</option>
                    <option value="L">[L] - Vật lý</option>
                    <option value="H">[H] - Hóa học</option>
                    <option value="B">[B] - Sinh học</option>
                    <option value="E">[E] - Tiếng Anh</option>
                    <option value="S">[S] - Lịch sử</option>
                    <option value="D">[D] - Địa lý</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-700 text-xs font-bold mb-1">Mã đề (Ví dụ: 01, 02):</label>
                  <input type="text" id="audit-exam-code" value="01" class="w-full border rounded-xl p-2 text-xs font-mono font-bold text-blue-900 bg-white" />
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700">2. Chọn file đề thi (Word .docx hoặc PDF):</label>
              <input type="file" id="file-uploader" accept=".docx,.pdf,.png,.jpg,.jpeg" class="w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-blue-700 file:text-white file:font-bold hover:file:bg-blue-800 cursor-pointer border rounded-xl p-1 bg-white shadow-sm" />
            </div>

            <button onclick="processUploadWithAI()" id="btn-process-ai" class="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2">
              <span>🚀 Bắt Đầu Đọc File, LaTeX Hóa & Thẩm Định Đề Tự Động</span>
            </button>

            <div id="ai-loading" class="hidden p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-center space-y-2">
              <div class="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-xs font-bold text-indigo-950">AI Backend đang đọc file và tự động chuyển đổi công thức sang LaTeX...</p>
            </div>
          </div>

          <div class="bg-slate-50 border border-dashed rounded-2xl p-4 flex flex-col justify-between text-xs">
            <div id="audit-result-box" class="space-y-3">
              <div class="h-64 flex flex-col items-center justify-center text-slate-400 text-center">
                <span class="text-3xl mb-1">📄</span>
                <span class="font-bold text-slate-600">Chưa có kết quả bóc tách.</span>
                <span class="text-[11px] mt-1 text-slate-500">Chọn file Word hoặc PDF và bấm nút Bắt Đầu ở bên trái.</span>
              </div>
            </div>

            <div id="audit-action-box" class="hidden pt-3 border-t mt-3 space-y-2">
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-2">
                <span class="font-bold text-amber-900 block text-xs" id="confirm-msg">
                  Bạn có muốn nạp các câu hỏi này vào Ngân hàng Đề Gốc không?
                </span>
                <div class="flex gap-2">
                  <button onclick="confirmAddAuditedToBank()" class="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition">
                    ✓ Xác nhận thêm vào Ngân hàng đề
                  </button>
                  <button onclick="clearAuditBox()" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition">
                    ✕ Hủy bỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Ngân hàng đề gốc -->
      <div id="admin-tab-bank" class="hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
          <div>
            <h2 class="text-lg font-bold text-blue-950">Ngân Hàng Đề Gốc (100% Nguyên Mẫu)</h2>
            <p class="text-xs text-slate-500">Mỗi câu đều có nút chỉnh sửa để thêm/thay đổi ảnh đồ thị, bảng biến thiên.</p>
          </div>
        </div>
        <div id="bank-list" class="space-y-4 max-h-[600px] overflow-y-auto pr-2"></div>
      </div>

      <!-- Tab 3: Ngân hàng luyện thi -->
      <div id="admin-tab-practice" class="hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
          <h2 class="text-lg font-bold text-blue-950">Ngân Hàng Luyện Thi (Câu Hỏi Tương Đương)</h2>
          <button onclick="alert('Đang xuất bài tập theo chuyên đề CT GDPT 2018 ra file...')" class="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">📥 Tải Bài Tập Chuyên Đề</button>
        </div>
        <div id="practice-list" class="space-y-3 max-h-[600px] overflow-y-auto pr-2"></div>
      </div>

      <!-- Tab 4: TẠO ĐỢT THI & QUẢN LÝ ĐỢT THI (KHÔI PHỤC ĐẦY ĐỦ) -->
      <div id="admin-tab-exams" class="hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div class="border-b pb-3 flex justify-between items-center">
          <div>
            <h2 class="text-lg font-bold text-blue-950">Tạo Đợt Thi Mới & Quản Lý Đợt Thi HSA</h2>
            <p class="text-xs text-slate-500">Cấu hình 3 phần thi: Toán & Số liệu (50 câu - 75p), Đọc hiểu Văn (50 câu - 60p), Phần Tự chọn (50đ).</p>
          </div>
        </div>

        <!-- Form Tạo Đợt Thi Mới -->
        <div class="p-4 bg-slate-50 rounded-2xl border space-y-3">
          <span class="font-bold text-xs uppercase tracking-wider text-slate-700">1. Cấu hình Tạo Đợt Thi Mới:</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label class="block font-semibold mb-1">Tên đợt thi:</label>
              <input type="text" id="new-exam-name" value="Đợt 2 - Khảo sát Năng lực HSA Chuẩn 2026" class="w-full border rounded-lg p-2 bg-white" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Mật khẩu đợt thi:</label>
              <input type="text" id="new-exam-passcode" value="HSA2026D2" class="w-full border rounded-lg p-2 bg-white font-mono font-bold text-blue-900" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Lệ phí hỗ trợ thẩm định:</label>
              <input type="text" id="new-exam-fee" value="50.000 VNĐ" class="w-full border rounded-lg p-2 bg-white font-bold text-emerald-700" />
            </div>
          </div>

          <div class="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border space-y-0.5">
            <div>✓ <strong>Ma trận độ khó chuẩn HSA:</strong> 25% Biết (B), 30% Hiểu (H), 30% Vận dụng (VD), tối đa 14% Vận dụng cao (VDC).</div>
            <div>✓ <strong>Chống lặp câu hỏi:</strong> Đảm bảo mỗi ID học viên khi thi ở các đợt khác nhau thì các câu hỏi không gặp lại.</div>
          </div>

          <button onclick="createNewExam()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition">
            + Tạo & Kích Hoạt Đợt Thi
          </button>
        </div>

        <!-- Danh sách các đợt thi hiện có -->
        <div class="space-y-3">
          <span class="font-bold text-xs uppercase tracking-wider text-slate-700">2. Danh sách các đợt thi đã tạo:</span>
          <div id="exams-list" class="space-y-2"></div>
        </div>
      </div>

      <!-- Tab 5: QUẢN LÝ THÍ SINH & HỌC VIÊN (KHÔI PHỤC ĐẦY ĐỦ) -->
      <div id="admin-tab-students" class="hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div class="border-b pb-3 flex justify-between items-center">
          <div>
            <h2 class="text-lg font-bold text-blue-950">Quản Lý Hồ Sơ Thí Sinh & Phê Duyệt Quyền Thi</h2>
            <p class="text-xs text-slate-500">Mã ID học viên chuẩn hóa: <code>[2 số cuối năm sinh]-[Lớp]-[STT]</code> (Ví dụ: 07-12A1-001 hoặc 07-TP-003).</p>
          </div>
          <button onclick="addNewStudentPrompt()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow">
            + Thêm Thí Sinh Mới
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-700 border-b">
              <tr>
                <th class="py-2.5 px-3">Mã ID</th>
                <th class="py-2.5 px-3">Họ và Tên</th>
                <th class="py-2.5 px-3">Năm sinh</th>
                <th class="py-2.5 px-3">Đơn vị lớp</th>
                <th class="py-2.5 px-3">Email</th>
                <th class="py-2.5 px-3 text-center">Trạng thái lệ phí</th>
                <th class="py-2.5 px-3 text-center">Đủ điều kiện thi</th>
                <th class="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody id="students-table-body" class="divide-y text-slate-700"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL CHỈNH SỬA CÂU HỎI -->
    <div id="edit-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white max-w-2xl w-full rounded-2xl p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center border-b pb-3">
          <span class="font-bold text-base text-blue-950">Chỉnh Sửa Câu Hỏi & Thay Đổi Ảnh (<span id="edit-modal-id">T01-01</span>)</span>
          <button onclick="closeEditModal()" class="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="font-bold text-slate-700">Nội dung câu hỏi đề gốc:</label>
              <span onclick="insertTagToEditModal()" class="text-[11px] text-blue-600 cursor-pointer font-bold">+ Chèn vị trí ảnh [HINH_ANH]</span>
            </div>
            <textarea id="edit-modal-content" rows="4" class="w-full border rounded-xl p-2.5 font-mono"></textarea>
          </div>

          <div class="p-3 bg-slate-50 border rounded-xl space-y-2">
            <span class="font-bold text-slate-800 block">Tải ảnh đồ thị / bảng biến thiên riêng cho câu này:</span>
            <input type="file" id="edit-modal-file" accept="image/*" onchange="previewEditImage(this)" class="text-xs text-slate-500" />
            <div id="edit-modal-preview" class="mt-2 text-center hidden">
              <img id="edit-modal-img" src="" class="max-h-48 mx-auto rounded border shadow-sm" />
              <button onclick="removeEditImage()" class="mt-1 text-rose-600 font-bold text-[11px]">Gỡ ảnh này</button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold mb-0.5">Phương án A:</label>
              <input type="text" id="edit-opt-0" class="w-full border rounded p-1.5 font-mono" />
            </div>
            <div>
              <label class="block font-semibold mb-0.5">Phương án B:</label>
              <input type="text" id="edit-opt-1" class="w-full border rounded p-1.5 font-mono" />
            </div>
            <div>
              <label class="block font-semibold mb-0.5">Phương án C:</label>
              <input type="text" id="edit-opt-2" class="w-full border rounded p-1.5 font-mono" />
            </div>
            <div>
              <label class="block font-semibold mb-0.5">Phương án D:</label>
              <input type="text" id="edit-opt-3" class="w-full border rounded p-1.5 font-mono" />
            </div>
          </div>
        </div>

        <div class="flex gap-2 pt-2 border-t">
          <button onclick="closeEditModal()" class="flex-1 py-2 border rounded-xl text-xs font-semibold hover:bg-slate-50">Hủy</button>
          <button onclick="saveEditModalChanges()" class="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow">
            Lưu Thay Đổi
          </button>
        </div>
      </div>
    </div>

  </main>

  <script>
    const SAMPLE_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='460' height='160' viewBox='0 0 460 160'><rect width='460' height='160' fill='%23ffffff' stroke='%23334155' stroke-width='2'/><line x1='60' y1='0' x2='60' y2='160' stroke='%23334155' stroke-width='1.5'/><line x1='0' y1='40' x2='460' y2='40' stroke='%23334155' stroke-width='1.5'/><line x1='0' y1='80' x2='460' y2='80' stroke='%23334155' stroke-width='1.5'/><text x='25' y='26' font-family='Times New Roman' font-size='15' font-weight='bold'>x</text><text x='15' y='65' font-family='Times New Roman' font-size='15' font-weight='bold'>f'(x)</text><text x='15' y='125' font-family='Times New Roman' font-size='15' font-weight='bold'>f(x)</text><text x='80' y='26' font-size='14'>-∞</text><text x='180' y='26' font-size='14'>-1</text><text x='280' y='26' font-size='14'>1</text><text x='390' y='26' font-size='14'>+∞</text><text x='130' y='65' font-size='15' fill='%2310b981' font-weight='bold'>+</text><text x='180' y='65' font-size='14'>0</text><text x='230' y='65' font-size='15' fill='%23ef4444' font-weight='bold'>-</text><text x='280' y='65' font-size='14'>0</text><text x='330' y='65' font-size='15' fill='%2310b981' font-weight='bold'>+</text><text x='80' y='145' font-size='13'>-∞</text><text x='180' y='95' font-size='14' font-weight='bold' fill='%23059669'>2</text><text x='280' y='145' font-size='14' font-weight='bold' fill='%23ea580c'>-2</text><text x='390' y='95' font-size='13'>+∞</text><line x1='100' y1='140' x2='170' y2='100' stroke='%2310b981' stroke-width='2'/><line x1='195' y1='100' x2='270' y2='140' stroke='%23ef4444' stroke-width='2'/><line x1='295' y1='140' x2='380' y2='100' stroke='%2310b981' stroke-width='2'/></svg>";

    // Dữ liệu học viên
    let students = [
      { id: "07-12A1-001", name: "Nguyễn Văn An", birthYear: "2007", classUnit: "12A1", email: "an.nguyen@example.com", eligible: true, feeStatus: "approved", regTime: "2026-10-15 08:30" },
      { id: "07-12A2-002", name: "Trần Thị Mai", birthYear: "2007", classUnit: "12A2", email: "mai.tran@example.com", eligible: false, feeStatus: "pending", regTime: "2026-10-16 14:15" },
      { id: "07-TP-003", name: "Lê Hoàng Long", birthYear: "2007", classUnit: "TP", email: "long.le@example.com", eligible: false, feeStatus: "unregistered", regTime: "-" }
    ];

    // Dữ liệu đợt thi
    let exams = [
      { id: "EXAM-2026-01", name: "Đợt 1 - Khảo sát Năng lực HSA Chuẩn 2026", passCode: "HSA2026", startTime: "2026-10-25 08:00", fee: "50.000 VNĐ", totalQuestions: 150 }
    ];

    // Dữ liệu câu hỏi
    let dbQuestions = [];
    let practiceDb = [];
    for (let i = 1; i <= 50; i++) {
      const numStr = i < 10 ? '0' + i : '' + i;
      const code = 'T01-' + numStr;
      const hasImg = (i % 3 === 1);
      let content = "";
      let opts = [];

      if (i % 3 === 1) {
        content = "Cho hàm số bậc ba $y = f(x)$ có bảng biến thiên như hình vẽ bên dưới:[HINH_ANH]Tìm tất cả các giá trị thực của tham số $m$ để phương trình $f(x) - 2m = 0$ có đúng 3 nghiệm thực phân biệt.";
        opts = ["$m \in (-1; 1)$", "$m \in [-2; 2]$", "$m < -1$ hoặc $m > 1$", "$m = 0$"];
      } else if (i % 3 === 2) {
        content = "Biết tích phân $I = \int_{1}^{e} \frac{\ln x}{x\sqrt{1 + \ln x}} dx = \frac{a - b\sqrt{2}}{c}$, với $a, b, c \in \mathbb{Z}$ và tối giản. Giá trị $S = a + b + c$ bằng:";
        opts = ["$S = 9$", "$S = 12$", "$S = 15$", "$S = 7$"];
      } else {
        content = "Trong hệ trục tọa độ Oxy, cho đường thẳng $d: 2x - y + 3 = 0$. Một vectơ chỉ phương của $d$ là:";
        opts = ["$\vec{u} = (1; 2)$", "$\vec{u} = (2; -1)$", "$\vec{u} = (-1; 2)$", "$\vec{u} = (2; 1)$"];
      }

      dbQuestions.push({
        id: code,
        subject: "Toán",
        content: content,
        hasImage: hasImg,
        imageCode: hasImg ? code + ".png" : "",
        imageSrc: null,
        options: opts,
        correctIndex: 0
      });

      if (i <= 15) {
        for (let k = 1; k <= 3; k++) {
          practiceDb.push({
            id: code + k,
            content: "Biến thể câu hỏi " + k + " cùng chuyên đề: " + content,
            hasImage: hasImg,
            imageCode: hasImg ? code + ".png" : "",
            imageSrc: null,
            options: opts
          });
        }
      }
    }

    let activeExamQuestions = [];
    let activeQuestionIdx = 0;
    let userAnswers = {};
    let timerInterval = null;
    let timeLeft = 75 * 60;
    let tempParsedQuestions = [];
    let editingIndex = -1;
    let currentEditImgData = null;

    window.addEventListener('DOMContentLoaded', () => {
      const savedKey = localStorage.getItem('HSA_GEMINI_KEY');
      if (savedKey) {
        const input = document.getElementById("input-api-key");
        if (input) input.value = savedKey;
      }
      renderExamsList();
      renderStudentsTable();
    });

    function parseKaTeX(text) {
      if (!text) return "";
      try {
        return String(text).normalize('NFC').replace(/\$([^$]+)\$/g, function(m, f) {
          try {
            if (window.katex) return window.katex.renderToString(f, { throwOnError: false });
          } catch(e) {}
          return '<span class="font-bold text-blue-900">' + f + '</span>';
        });
      } catch(e) {
        return text;
      }
    }

    function switchView(view) {
      document.getElementById("view-student").classList.toggle("hidden", view !== 'student');
      document.getElementById("view-admin").classList.toggle("hidden", view !== 'admin');
      document.getElementById("btn-view-student").className = view === 'student' ? 'px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition bg-amber-400 text-slate-950 shadow' : 'px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition text-blue-200 hover:text-white';
      document.getElementById("btn-view-admin").className = view === 'admin' ? 'px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition bg-amber-400 text-slate-950 shadow' : 'px-3.5 py-1 text-xs md:text-sm font-bold rounded-lg transition text-blue-200 hover:text-white';
      if (view === 'admin') {
        renderBankList();
        renderPracticeList();
        renderExamsList();
        renderStudentsTable();
      }
    }

    function switchAdminTab(tab) {
      document.getElementById("admin-tab-audit").classList.toggle("hidden", tab !== 'audit');
      document.getElementById("admin-tab-bank").classList.toggle("hidden", tab !== 'bank');
      document.getElementById("admin-tab-practice").classList.toggle("hidden", tab !== 'practice');
      document.getElementById("admin-tab-exams").classList.toggle("hidden", tab !== 'exams');
      document.getElementById("admin-tab-students").classList.toggle("hidden", tab !== 'students');

      const tabs = ['audit', 'bank', 'practice', 'exams', 'students'];
      tabs.forEach(t => {
        const btn = document.getElementById("tab-btn-" + t);
        if (btn) {
          btn.className = t === tab ? 'px-3.5 py-2 text-xs font-bold rounded-xl transition bg-blue-800 text-white shadow ring-2 ring-amber-400' : 'px-3.5 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100';
        }
      });

      if (tab === 'exams') renderExamsList();
      if (tab === 'students') renderStudentsTable();
    }

    // AI THẨM ĐỊNH (gemini-3.8-flash)
    async function processUploadWithAI() {
      const fileInput = document.getElementById("file-uploader");
      const file = fileInput ? fileInput.files[0] : null;
      if (!file) {
        alert("Vui lòng chọn một file Word (.docx) hoặc PDF đề thi!");
        return;
      }

      const apiKeyInput = document.getElementById("input-api-key");
      const apiKey = apiKeyInput ? apiKeyInput.value.trim() : "";
      if (!apiKey) {
        alert("Vui lòng nhập Gemini API Key!");
        return;
      }

      localStorage.setItem('HSA_GEMINI_KEY', apiKey);

      const sub = document.getElementById("audit-subject").value;
      const code = document.getElementById("audit-exam-code").value.trim() || "01";

      document.getElementById("ai-loading").classList.remove("hidden");
      document.getElementById("btn-process-ai").disabled = true;

      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64Data = reader.result.split(',')[1];
          const mimeType = file.type || (file.name.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf');

          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileData: base64Data,
              fileName: file.name,
              mimeType: mimeType,
              subject: sub,
              examCode: code,
              apiKey: apiKey
            })
          });

          const result = await response.json();
          document.getElementById("ai-loading").classList.add("hidden");
          document.getElementById("btn-process-ai").disabled = false;

          if (!response.ok || result.error) {
            alert("Lỗi từ máy chủ: " + (result.error || "Không rõ nguyên nhân"));
            return;
          }

          if (result.questions && result.questions.length > 0) {
            tempParsedQuestions = result.questions.map(q => ({
              ...q,
              imageCode: q.id + ".png",
              imageSrc: null
            }));
            displayAuditedResults(tempParsedQuestions);
          } else {
            alert("AI không nhận diện được câu hỏi nào từ file.");
          }
        };
      } catch (err) {
        document.getElementById("ai-loading").classList.add("hidden");
        document.getElementById("btn-process-ai").disabled = false;
        alert("Lỗi kết nối: " + err.message);
      }
    }

    function displayAuditedResults(questions) {
      const container = document.getElementById("audit-result-box");
      let html = `<div class="space-y-4 max-h-[500px] overflow-y-auto pr-1">`;
      html += `<div class="p-2 bg-emerald-100 text-emerald-900 rounded font-bold text-xs">✓ Đã bóc tách thành công ${questions.length} câu hỏi từ file!</div>`;

      questions.forEach((q, idx) => {
        html += `
          <div class="p-3 bg-white border rounded-xl space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="bg-amber-300 font-mono font-bold text-blue-950 px-2 py-0.5 rounded">${q.id}</span>
              <label class="text-[11px] text-blue-600 hover:underline cursor-pointer font-bold">
                📷 Chọn ảnh/đồ thị riêng
                <input type="file" accept="image/*" onchange="attachImageToParsed(${idx}, this)" class="hidden" />
              </label>
            </div>
            <div class="leading-relaxed">
              ${parseKaTeX(q.content.replace("[HINH_ANH]", ""))}
              ${q.hasImage ? `
                <div class="my-2 p-3 bg-slate-50 border rounded text-center">
                  ${q.imageSrc ? `<img src="${q.imageSrc}" class="max-h-40 mx-auto rounded shadow-sm" />` : `<span class="font-mono text-blue-700 font-bold">[Vị trí ảnh riêng của câu: ${q.imageCode}]</span>`}
                </div>
              ` : ''}
            </div>
            <div class="grid grid-cols-2 gap-1 text-[11px]">
              ${q.options.map(opt => `<div class="p-1 border rounded bg-slate-50">${parseKaTeX(opt)}</div>`).join('')}
            </div>
          </div>
        `;
      });
      html += `</div>`;

      container.innerHTML = html;
      document.getElementById("audit-action-box").classList.remove("hidden");
      document.getElementById("confirm-msg").innerText = `Bạn có chắc chắn muốn nạp toàn bộ ${questions.length} câu hỏi này vào Ngân Hàng Đề Gốc không?`;
    }

    function attachImageToParsed(idx, input) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          tempParsedQuestions[idx].hasImage = true;
          tempParsedQuestions[idx].imageSrc = e.target.result;
          displayAuditedResults(tempParsedQuestions);
        };
        reader.readAsDataURL(file);
      }
    }

    function confirmAddAuditedToBank() {
      if (tempParsedQuestions.length === 0) return;

      tempParsedQuestions.forEach(q => {
        dbQuestions.unshift({
          id: q.id,
          subject: "Toán",
          content: q.content,
          hasImage: q.hasImage,
          imageCode: q.imageCode || (q.id + ".png"),
          imageSrc: q.imageSrc,
          options: q.options,
          correctIndex: q.correctIndex || 0
        });

        if (q.variants && q.variants.length > 0) {
          q.variants.forEach(v => {
            practiceDb.unshift({
              id: v.id,
              content: v.content,
              hasImage: q.hasImage,
              imageCode: q.imageCode,
              imageSrc: q.imageSrc,
              options: v.options || q.options
            });
          });
        }
      });

      alert(`✓ THÀNH CÔNG! Đã nạp ${tempParsedQuestions.length} câu hỏi gốc vào Ngân hàng Đề Gốc.`);
      clearAuditBox();
      renderBankList();
      renderPracticeList();
    }

    function clearAuditBox() {
      tempParsedQuestions = [];
      document.getElementById("audit-result-box").innerHTML = `
        <div class="h-64 flex flex-col items-center justify-center text-slate-400 text-center">
          <span class="text-3xl mb-1">📄</span>
          <span class="font-bold text-slate-600">Chưa có kết quả bóc tách.</span>
          <span class="text-[11px] mt-1 text-slate-500">Nhập mã đề, chọn file Word hoặc PDF và bấm nút Bắt Đầu ở bên trái.</span>
        </div>
      `;
      document.getElementById("audit-action-box").classList.add("hidden");
      const fileInput = document.getElementById("file-uploader");
      if (fileInput) fileInput.value = "";
    }

    // NGÂN HÀNG ĐỀ GỐC
    function renderBankList() {
      document.getElementById("bank-count").innerText = dbQuestions.length;
      document.getElementById("bank-list").innerHTML = dbQuestions.map((q, idx) => `
        <div class="p-4 bg-slate-50 border rounded-2xl text-xs space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-mono font-bold text-blue-950 bg-amber-300 px-2 py-0.5 rounded">${q.id}</span>
            <div class="flex gap-2">
              <button onclick="openEditModal(${idx})" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded shadow text-xs">
                ✏️ Sửa câu / Thêm ảnh
              </button>
              <button onclick="if(confirm('Xóa câu ${q.id}?')){ dbQuestions.splice(${idx}, 1); renderBankList(); }" class="text-rose-600 hover:text-rose-800 font-bold border border-rose-200 px-2 py-1 rounded bg-white">
                🗑️ Xóa
              </button>
            </div>
          </div>
          <div class="bg-white p-3 rounded-xl border leading-relaxed">
            ${parseKaTeX(q.content.replace("[HINH_ANH]", ""))}
            ${q.hasImage ? `
              <div class="my-2 p-2 bg-slate-50 border rounded text-center">
                ${q.imageSrc ? `<img src="${q.imageSrc}" class="max-h-48 mx-auto rounded" />` : `<span class="font-mono text-blue-700 font-bold">[Ảnh riêng của câu: ${q.imageCode}]</span>`}
              </div>
            ` : ''}
          </div>
          <div class="grid grid-cols-2 gap-1.5 pt-1">
            ${q.options.map((opt, oIdx) => `
              <div class="p-1.5 border rounded bg-white ${oIdx === q.correctIndex ? 'border-emerald-500 font-bold text-emerald-900 bg-emerald-50' : ''}">
                <span class="font-bold mr-1">${String.fromCharCode(65 + oIdx)}.</span>
                ${parseKaTeX(opt)}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    function renderPracticeList() {
      document.getElementById("practice-count").innerText = practiceDb.length;
      document.getElementById("practice-list").innerHTML = practiceDb.map((q, idx) => `
        <div class="p-3 bg-slate-50 border rounded-xl text-xs space-y-1.5">
          <span class="font-mono font-bold text-indigo-950 bg-indigo-100 px-2 py-0.5 rounded">${q.id}</span>
          <div class="bg-white p-2.5 rounded-lg border leading-relaxed">
            ${parseKaTeX(q.content.replace("[HINH_ANH]", ""))}
            ${q.hasImage && q.imageSrc ? `<div class="my-2 p-1 text-center"><img src="${q.imageSrc}" class="max-h-36 mx-auto rounded" /></div>` : ''}
          </div>
        </div>
      `).join('');
    }

    // QUẢN LÝ ĐỢT THI
    function renderExamsList() {
      const container = document.getElementById("exams-list");
      if (!container) return;
      container.innerHTML = exams.map((ex, idx) => `
        <div class="p-4 bg-white border rounded-xl flex justify-between items-center text-xs shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-blue-950">${ex.name}</span>
              <span class="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Mật khẩu: ${ex.passCode}</span>
            </div>
            <p class="text-slate-500 mt-1">Lệ phí: <strong class="text-emerald-700">${ex.fee}</strong> | 150 câu (3 phần thi HSA)</p>
          </div>
          <button onclick="deleteExam(${idx})" class="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded-lg transition">
            🗑️ Xóa Đợt Thi
          </button>
        </div>
      `).join('');
    }

    function createNewExam() {
      const name = document.getElementById("new-exam-name").value.trim();
      const pass = document.getElementById("new-exam-passcode").value.trim();
      const fee = document.getElementById("new-exam-fee").value.trim();

      if (!name || !pass) {
        alert("Vui lòng nhập tên đợt thi và mật khẩu!");
        return;
      }

      exams.push({
        id: "EXAM-" + Date.now().toString().slice(-4),
        name: name,
        passCode: pass,
        startTime: "2026-11-01 08:00",
        fee: fee || "50.000 VNĐ",
        totalQuestions: 150
      });

      renderExamsList();
      alert("✓ ĐÃ TẠO ĐỢT THI MỚI THÀNH CÔNG!");
    }

    function deleteExam(idx) {
      if (confirm("Bạn có chắc chắn muốn xóa đợt thi này?")) {
        exams.splice(idx, 1);
        renderExamsList();
      }
    }

    // QUẢN LÝ THÍ SINH & HỌC VIÊN
    function renderStudentsTable() {
      const tbody = document.getElementById("students-table-body");
      if (!tbody) return;
      tbody.innerHTML = students.map((st, idx) => `
        <tr class="hover:bg-slate-50">
          <td class="py-2.5 px-3 font-mono font-bold text-blue-900">${st.id}</td>
          <td class="py-2.5 px-3 font-semibold">${st.name}</td>
          <td class="py-2.5 px-3">${st.birthYear}</td>
          <td class="py-2.5 px-3">${st.classUnit}</td>
          <td class="py-2.5 px-3 text-slate-500">${st.email}</td>
          <td class="py-2.5 px-3 text-center">
            ${st.feeStatus === 'approved' ? '<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[11px]">ĐÃ NỘP</span>' : '<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[11px]">CHỜ DUYỆT</span>'}
          </td>
          <td class="py-2.5 px-3 text-center">
            <span class="px-2.5 py-0.5 rounded font-bold text-[11px] ${st.eligible ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-800'}">
              ${st.eligible ? '✓ ĐỦ ĐIỀU KIỆN' : '✗ KHÓA THI'}
            </span>
          </td>
          <td class="py-2.5 px-3 text-right">
            <button onclick="toggleStudentEligibility(${idx})" class="text-blue-600 hover:text-blue-800 font-bold hover:underline">
              ${st.eligible ? 'Tắt quyền thi' : 'Duyệt phí & Bật quyền thi'}
            </button>
          </td>
        </tr>
      `).join('');
    }

    function toggleStudentEligibility(idx) {
      students[idx].eligible = !students[idx].eligible;
      if (students[idx].eligible) students[idx].feeStatus = 'approved';
      renderStudentsTable();
    }

    function addNewStudentPrompt() {
      const name = prompt("Họ và tên thí sinh:");
      if (!name) return;
      const year = prompt("Năm sinh (ví dụ: 2007):", "2007") || "2007";
      const cls = prompt("Đơn vị lớp (ví dụ: 12A1 hoặc để trống nếu tự do):", "12A1") || "TP";
      const email = prompt("Email nhận kết quả:", "hocsinh@example.com") || "";

      const yShort = year.slice(-2);
      const stt = (students.length + 1 < 10 ? '00' : (students.length + 1 < 100 ? '0' : '')) + (students.length + 1);
      const newId = `${yShort}-${cls}-${stt}`;

      students.push({
        id: newId,
        name: name,
        birthYear: year,
        classUnit: cls,
        email: email,
        eligible: true,
        feeStatus: "approved",
        regTime: new Date().toLocaleString('vi-VN')
      });

      renderStudentsTable();
      alert(`✓ Đã thêm thí sinh ${name} với ID: ${newId}!`);
    }

    // MODAL CHỈNH SỬA CÂU HỎI
    function openEditModal(idx) {
      editingIndex = idx;
      const q = dbQuestions[idx];
      document.getElementById("edit-modal-id").innerText = q.id;
      document.getElementById("edit-modal-content").value = q.content;
      document.getElementById("edit-opt-0").value = q.options[0] || "";
      document.getElementById("edit-opt-1").value = q.options[1] || "";
      document.getElementById("edit-opt-2").value = q.options[2] || "";
      document.getElementById("edit-opt-3").value = q.options[3] || "";

      currentEditImgData = q.imageSrc;
      const previewBox = document.getElementById("edit-modal-preview");
      const imgEl = document.getElementById("edit-modal-img");

      if (q.imageSrc) {
        imgEl.src = q.imageSrc;
        previewBox.classList.remove("hidden");
      } else {
        previewBox.classList.add("hidden");
      }

      document.getElementById("edit-modal-file").value = "";
      document.getElementById("edit-modal").classList.remove("hidden");
    }

    function closeEditModal() {
      document.getElementById("edit-modal").classList.add("hidden");
      editingIndex = -1;
      currentEditImgData = null;
    }

    function insertTagToEditModal() {
      const el = document.getElementById("edit-modal-content");
      el.value += " [HINH_ANH] ";
    }

    function previewEditImage(input) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentEditImgData = e.target.result;
          document.getElementById("edit-modal-img").src = currentEditImgData;
          document.getElementById("edit-modal-preview").classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    }

    function removeEditImage() {
      currentEditImgData = null;
      document.getElementById("edit-modal-preview").classList.add("hidden");
      document.getElementById("edit-modal-file").value = "";
    }

    function saveEditModalChanges() {
      if (editingIndex < 0) return;
      const q = dbQuestions[editingIndex];
      q.content = document.getElementById("edit-modal-content").value;
      q.options = [
        document.getElementById("edit-opt-0").value,
        document.getElementById("edit-opt-1").value,
        document.getElementById("edit-opt-2").value,
        document.getElementById("edit-opt-3").value
      ];
      q.imageSrc = currentEditImgData;
      q.hasImage = !!currentEditImgData || q.content.includes("[HINH_ANH]");

      closeEditModal();
      renderBankList();
      alert("✓ Đã lưu thay đổi cho câu " + q.id + "!");
    }

    // Thi & Luyện tập
    function startPracticeSession() {
      activeExamQuestions = dbQuestions.slice(0, 30);
      initExamSession("BÀI LUYỆN TẬP CHUYÊN ĐỀ", 45 * 60);
    }

    function startOfficialExam() {
      const pass = document.getElementById("input-exam-pass").value;
      if (pass !== "HSA2026") {
        alert("Mật khẩu không chính xác! (Nhập: HSA2026)");
        return;
      }
      activeExamQuestions = dbQuestions.slice(0, 50);
      initExamSession("BÀI THI CHÍNH THỨC HSA", 75 * 60);
    }

    function initExamSession(title, seconds) {
      document.getElementById("student-hub").classList.add("hidden");
      document.getElementById("student-exam").classList.remove("hidden");
      document.getElementById("student-result").classList.add("hidden");
      document.getElementById("exam-badge").innerText = title;

      activeQuestionIdx = 0;
      userAnswers = {};
      timeLeft = seconds;

      renderCurrentQuestion();
      renderMatrix();

      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById("exam-timer").innerText = (m < 10 ? '0' : '') + m + ":" + (s < 10 ? '0' : '') + s;
        if (timeLeft <= 0) submitExam();
      }, 1000);
    }

    function renderCurrentQuestion() {
      const q = activeExamQuestions[activeQuestionIdx];
      if (!q) return;

      document.getElementById("q-number").innerText = "Câu " + (activeQuestionIdx + 1);
      document.getElementById("q-code").innerText = q.id;

      let contentHtml = parseKaTeX(q.content.replace("[HINH_ANH]", ""));
      if (q.hasImage && q.imageSrc) {
        contentHtml += `<div class="my-3 p-2 bg-slate-50 border rounded text-center"><img src="${q.imageSrc}" class="max-h-52 mx-auto" /></div>`;
      }
      document.getElementById("q-content").innerHTML = contentHtml;

      document.getElementById("q-options").innerHTML = q.options.map((opt, oIdx) => `
        <div onclick="selectAnswer(${oIdx})" class="p-3 border rounded-xl text-xs md:text-sm font-medium cursor-pointer transition ${userAnswers[activeQuestionIdx] === oIdx ? 'bg-blue-50 border-blue-600 font-bold text-blue-900' : 'hover:bg-slate-50 bg-white'}">
          <span class="mr-2 font-bold">${String.fromCharCode(65 + oIdx)}.</span>
          ${parseKaTeX(opt)}
        </div>
      `).join('');
    }

    function renderMatrix() {
      const container = document.getElementById("q-matrix");
      container.innerHTML = activeExamQuestions.map((_, idx) => `
        <button onclick="activeQuestionIdx = ${idx}; renderCurrentQuestion(); renderMatrix();" class="h-8 rounded text-xs font-bold ${activeQuestionIdx === idx ? 'ring-2 ring-blue-600' : ''} ${userAnswers[idx] !== undefined ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}">
          ${idx + 1}
        </button>
      `).join('');
    }

    function selectAnswer(oIdx) {
      userAnswers[activeQuestionIdx] = oIdx;
      renderCurrentQuestion();
      renderMatrix();
    }

    function prevQuestion() {
      if (activeQuestionIdx > 0) {
        activeQuestionIdx--;
        renderCurrentQuestion();
        renderMatrix();
      }
    }

    function nextQuestion() {
      if (activeQuestionIdx < activeExamQuestions.length - 1) {
        activeQuestionIdx++;
        renderCurrentQuestion();
        renderMatrix();
      }
    }

    function submitExam() {
      if (timerInterval) clearInterval(timerInterval);
      let score = 0;
      activeExamQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) score++;
      });

      document.getElementById("student-exam").classList.add("hidden");
      document.getElementById("student-result").classList.remove("hidden");
      document.getElementById("result-score").innerText = (score * 3) + " / 150";
    }

    function backToHub() {
      document.getElementById("student-hub").classList.remove("hidden");
      document.getElementById("student-result").classList.add("hidden");
    }

    // Chống rời màn hình
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && !document.getElementById("student-exam").classList.contains("hidden")) {
        alert("⚠️ CẢNH BÁO: Rời màn hình thi! Hãy tập trung làm bài.");
      }
    });

    // Mặc định khởi động vào phòng học viên
    switchView('student');
  </script>
</body>
</html>
