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
          <span class="text-xs text-blue-200">ĐHQGHN • CT GDPT 2018 • Chuẩn Công Thức & Ảnh Đồ Thị Độc Lập</span>
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
                Rèn luyện câu hỏi bám sát CT GDPT 2018. Hiển thị công thức KaTeX và đồ thị/bảng biến thiên chuẩn xác từng câu.
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

    <!-- ==================== VIEW 2: PHÒNG QUẢN TRỊ ==================== -->
    <div id="view-admin" class="hidden space-y-6">
      <div class="bg-white p-2.5 rounded-2xl shadow-sm border flex flex-wrap gap-2">
        <button id="tab-btn-audit" onclick="switchAdminTab('audit')" class="px-4 py-2 text-xs font-bold rounded-xl transition bg-blue-800 text-white shadow ring-2 ring-amber-400">
          📤 1. AI Tự Động LaTeX Hóa & Thẩm Định Đề
        </button>
        <button id="tab-btn-bank" onclick="switchAdminTab('bank')" class="px-4 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          📚 2. Ngân Hàng Đề Gốc (<span id="bank-count">50</span> câu)
        </button>
        <button id="tab-btn-practice" onclick="switchAdminTab('practice')" class="px-4 py-2 text-xs font-bold rounded-xl transition text-slate-700 hover:bg-slate-100">
          🎯 3. Ngân Hàng Luyện Thi (<span id="practice-count">45</span> câu)
        </button>
      </div>

      <!-- Tab 1: AI Tải file tự động LaTeX hóa -->
      <div id="admin-tab-audit" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div class="border-b pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h2 class="text-lg font-bold text-blue-950">Tải File Đề Thi (Word / PDF) & Tự Động LaTeX Hóa Bằng AI Backend</h2>
            <p class="text-xs text-slate-500">Mỗi câu hỏi có đồ thị/bảng biến thiên sẽ được gắn mã định danh ảnh riêng biệt.</p>
          </div>
          <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            AI Multimodal Engine Active
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3">
              <span class="font-bold text-blue-950 text-xs block uppercase">1. Cấu hình Gemini API & Đề Nạp:</span>
              
              <div>
                <label class="block text-slate-700 text-xs font-bold mb-1">Gemini API Key (Miễn phí từ aistudio.google.com):</label>
                <input type="password" id="input-api-key" placeholder="Dán mã khóa AI Studio của bạn vào đây..." class="w-full border rounded-xl p-2 text-xs font-mono bg-white outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div class="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label class="block text-slate-700 text-xs font-bold mb-1">Môn thi:</label>
                  <select id="audit-subject" class="w-full border rounded-xl p-2 text-xs font-bold bg-white">
                    <option value="T">[T] - Toán và xử lý số liệu
