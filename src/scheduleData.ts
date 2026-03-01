/**
 * Dữ liệu lịch học - CHỈ SỬA FILE NÀY khi cập nhật lịch.
 * File này được dùng bởi LawScheduleSheet (calendar + bảng).
 */

export type ScheduleItem = {
  week: number;
  date: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  phase: number;
  note?: string;
};

export const scheduleData: ScheduleItem[] = [
  // GIAI ĐOẠN 1
  { week: 1, date: '20/01', day: 'Thứ 3', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'C.206NTT', phase: 1 },
  { week: 1, date: '22/01', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 1 },
  { week: 1, date: '22/01', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 1 },
  { week: 1, date: '24/01', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 1 },
  { week: 1, date: '24/01', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 1 },

  { week: 2, date: '27/01', day: 'Thứ 3', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'C.206NTT', phase: 1 },
  { week: 2, date: '29/01', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 1 },
  { week: 2, date: '29/01', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 1 },

  // Tuần 3, 4, 5, 6 nghỉ Tết - không có lịch học

  // GIAI ĐOẠN 2
  { week: 7, date: '05/03', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 2 },
  { week: 7, date: '05/03', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },

  { week: 8, date: '11/03', day: 'Thứ 4', time: 'Chiều (7-8)', subject: 'Sinh hoạt lớp', room: 'B.305NTT', phase: 2 },
  { week: 8, date: '12/03', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 2 },
  { week: 8, date: '12/03', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },
  { week: 8, date: '14/03', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 8, date: '14/03', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },

  { week: 9, date: '19/03', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 2 },
  { week: 9, date: '19/03', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },
  { week: 9, date: '21/03', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 9, date: '21/03', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },

  { week: 10, date: '26/03', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Lịch sử Đảng Cộng sản VN', room: 'B.305NTT', phase: 2, note: 'Buổi cuối' },
  { week: 10, date: '26/03', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },
  { week: 10, date: '28/03', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 10, date: '28/03', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },

  { week: 11, date: '02/04', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 11, date: '02/04', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },
  { week: 11, date: '04/04', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 11, date: '04/04', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },

  { week: 12, date: '08/04', day: 'Thứ 4', time: 'Chiều (7-8)', subject: 'Sinh hoạt lớp', room: 'B.305NTT', phase: 2 },
  { week: 12, date: '09/04', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },
  { week: 12, date: '09/04', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Pháp luật thương mại HH & DV', room: 'B.305NTT', phase: 2 },
  { week: 12, date: '11/04', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2 },
  { week: 12, date: '11/04', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },

  { week: 13, date: '14/04', day: 'Thứ 3', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },
  { week: 13, date: '16/04', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2 },
  { week: 13, date: '18/04', day: 'Thứ 7', time: 'Sáng (1-5)', subject: 'Luật Ngân hàng', room: 'B.305NTT', phase: 2, note: 'Buổi cuối' },
  { week: 13, date: '18/04', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hình sự phần chung', room: 'B.305NTT', phase: 2, note: 'Buổi cuối' },

  // Tuần 14, 15 không có lịch học

  // GIAI ĐOẠN 3
  { week: 16, date: '05/05', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 16, date: '07/05', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 16, date: '07/05', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 16, date: '09/05', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 17, date: '12/05', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 17, date: '13/05', day: 'Thứ 4', time: 'Chiều (7-8)', subject: 'Sinh hoạt lớp', room: 'B.305NTT', phase: 3 },
  { week: 17, date: '14/05', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 17, date: '14/05', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 17, date: '16/05', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 18, date: '19/05', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 18, date: '21/05', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 18, date: '21/05', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 18, date: '23/05', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 19, date: '26/05', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 19, date: '28/05', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 19, date: '28/05', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 19, date: '30/05', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 20, date: '02/06', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 20, date: '04/06', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 20, date: '04/06', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 20, date: '06/06', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 21, date: '09/06', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 21, date: '10/06', day: 'Thứ 4', time: 'Chiều (7-8)', subject: 'Sinh hoạt lớp', room: 'B.305NTT', phase: 3 },
  { week: 21, date: '11/06', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 21, date: '11/06', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 21, date: '13/06', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 22, date: '16/06', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3 },
  { week: 22, date: '18/06', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3 },
  { week: 22, date: '18/06', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 22, date: '20/06', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3 },

  { week: 23, date: '23/06', day: 'Thứ 3', time: 'Sáng (1-5)', subject: 'Luật biển', room: 'B.305NTT', phase: 3, note: 'Buổi cuối' },
  { week: 23, date: '25/06', day: 'Thứ 3', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 23, date: '25/06', day: 'Thứ 5', time: 'Sáng (1-5)', subject: 'Luật Đất đai', room: 'B.305NTT', phase: 3, note: 'Buổi cuối' },
  { week: 23, date: '25/06', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 23, date: '27/06', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Hôn nhân và gia đình', room: 'B.305NTT', phase: 3, note: 'Buổi cuối' },

  { week: 24, date: '30/06', day: 'Thứ 3', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 24, date: '02/07', day: 'Thứ 5', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3 },
  { week: 24, date: '04/07', day: 'Thứ 7', time: 'Chiều (7-11)', subject: 'Luật Lao động', room: 'B.305NTT', phase: 3, note: 'Buổi cuối' },
];
