<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
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
          <span class="text-xs text-blue-200">ĐHQGHN • CT GDPT 2018 • gemini-3.8-flash Engine</span>
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
              <h2 class="text-lg font-bold text-slate-900">Nguyễn Văn An</h2>
              <span class="bg-blue-100 text-blue-900 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full">07-12A1-001</span>
              <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Lớp: 12A1</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Đợt thi: <strong>Đợt 1 - Khảo sát Năng lực HSA Chuẩn 2026</strong></p>
          </div>
          <div>
            <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
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
                Rèn luyện câu hỏi bám sát CT GDPT 2018. Hiển thị công thức KaTeX và bảng biến thiên chuẩn xác.
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

      <!-- Tab 2: Ngân hàng đề gốc (ĐẦY ĐỦ NÚT SỬA & XÓA) -->
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
          <button onclick="alert('Đang tải bài tập theo chuyên đề...')" class="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">📥 Tải Bài Tập Chuyên Đề</button>
        </div>
        <div id="practice-list" class="space-y-3 max-h-[600px] overflow-y-auto pr-2"></div>
      </div>

      <!-- Tab 4: TẠO ĐỢT THI & QUẢN LÝ ĐỢT THI -->
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

      <!-- Tab 5: QUẢN LÝ THÍ SINH & HỌC VIÊN -->
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

    <!-- MODAL CHỈNH SỬA CÂU HỎI & THAY ĐỔI ẢNH ĐỒ THỊ/BẢNG BIẾN THIÊN -->
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

    // Dữ liệu câu hỏi ban đầu
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
        opts = ["$m \\in (-1; 1)$", "$m \\in [-2; 2]$", "$m < -1$ hoặc $m > 1$", "$m = 0$"];
      } else if (i % 3 === 2) {
        content = "Biết tích phân $I = \\int_{1}^{e} \\frac{\\ln x}{x\\sqrt{1 + \\ln x}} dx = \\frac{a - b\\sqrt{2}}{c}$, với $a, b, c \\in \\mathbb{Z}$ và tối giản. Giá trị $S = a + b + c$ bằng:";
        opts = ["$S = 9$", "$S = 12$", "$S = 15$", "$S = 7$"];
      } else {
        content = "Trong hệ trục tọa độ Oxy, cho đường thẳng $d: 2x - y + 3 = 0$. Một vectơ chỉ phương của $d$ là:";
        opts = ["$\\vec{u} = (1; 2)$", "$\\vec{u} = (2; -1)$", "$\\vec{u} = (-1; 2)$", "$\\vec{u} = (2; 1)$"];
      }

      dbQuestions.push({
        id: code,
        subject: "Toán",
        content: content,
        hasImage: hasImg,
        imageCode: hasImg ? code + ".png" : "",
        imageSrc: null, // Không gán ảnh trùng nhau, mỗi câu quản lý ảnh độc lập
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
        return String(text).normalize('NFC').replace(/\\$([^$]+)\\$/g, function(m, f) {
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

    function switchAdminTab(tab
