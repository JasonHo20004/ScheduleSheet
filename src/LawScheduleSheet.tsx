import { useState, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View, Navigate, type NavigateAction } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Download, Calendar, BookOpen, Clock, MapPin, Filter, List, LayoutGrid, ChevronLeft, ChevronRight, CalendarCheck, CalendarRange, CalendarDays } from 'lucide-react';
import { scheduleData, type ScheduleItem } from './scheduleData';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'vi': vi },
});

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: ScheduleItem;
};

function parseTimeToHours(timeStr: string): { startHour: number; startMin: number; endHour: number; endMin: number } {
  if (timeStr.includes('Sáng (1-5)')) return { startHour: 7, startMin: 0, endHour: 11, endMin: 30 };
  if (timeStr.includes('Chiều (7-11)')) return { startHour: 13, startMin: 0, endHour: 17, endMin: 30 };
  if (timeStr.includes('Chiều (7-8)')) return { startHour: 13, startMin: 0, endHour: 14, endMin: 0 };
  return { startHour: 7, startMin: 0, endHour: 11, endMin: 30 };
}

function scheduleToEvents(schedule: ScheduleItem[]): CalendarEvent[] {
  return schedule.map((item, index) => {
    const [day, month] = item.date.split('/').map(Number);
    const year = 2025;
    const { startHour, startMin, endHour, endMin } = parseTimeToHours(item.time);
    const start = new Date(year, month - 1, day, startHour, startMin);
    const end = new Date(year, month - 1, day, endHour, endMin);
    const title = item.note ? `${item.subject} (${item.note})` : item.subject;
    return {
      id: `event-${index}`,
      title: `${title} - ${item.room}`,
      start,
      end,
      resource: item,
    };
  });
}

type ViewMode = 'table' | 'calendar';

// Ngày mặc định: tháng 3/2025 - thời điểm có nhiều lịch học
const DEFAULT_CALENDAR_DATE = new Date(2025, 2, 1);

type CustomToolbarProps = {
  label: string;
  onNavigate: (action: NavigateAction, date?: Date) => void;
  onView: (view: View) => void;
  view: View;
  views: View[];
};

const CustomToolbar = ({ label, onNavigate, onView, view, views }: CustomToolbarProps) => {
  const viewLabels: Record<string, { label: string; icon: typeof Calendar }> = {
    month: { label: 'Tháng', icon: Calendar },
    week: { label: 'Tuần', icon: CalendarRange },
    work_week: { label: 'Tuần', icon: CalendarRange },
    day: { label: 'Ngày', icon: CalendarDays },
    agenda: { label: 'Danh sách', icon: List },
  };

  const filteredViews = views.filter((v) => v !== 'work_week');

  return (
    <div className="rbc-toolbar flex flex-wrap items-center justify-between gap-4 p-2">
      {/* Nút điều hướng - bên trái */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate(Navigate.TODAY)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <CalendarCheck size={18} />
          Hôm nay
        </button>
        <button
          type="button"
          onClick={() => onNavigate(Navigate.PREVIOUS)}
          className="flex items-center gap-1 p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft size={20} />
          Trước
        </button>
        <button
          type="button"
          onClick={() => onNavigate(Navigate.NEXT)}
          className="flex items-center gap-1 p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Sau
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Label tháng/ngày - giữa */}
      <span className="text-lg font-semibold text-gray-800">{label}</span>

      {/* Nút chế độ xem - bên phải */}
      <div className="flex gap-1">
        {filteredViews.map((v) => {
          const { label: vLabel, icon: Icon } = viewLabels[v] || { label: v, icon: Calendar };
          const isActive = view === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onView(v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon size={16} />
              {vLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const LawScheduleSheet = () => {
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterPhase, setFilterPhase] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [calendarView, setCalendarView] = useState<View>('month');
  const [calendarDate, setCalendarDate] = useState<Date>(DEFAULT_CALENDAR_DATE);

  const subjects = [...new Set(scheduleData.map(item => item.subject))];

  const filteredData = useMemo(() => {
    return scheduleData.filter(item => {
      const subjectMatch = filterSubject === 'all' || item.subject === filterSubject;
      const phaseMatch = filterPhase === 'all' || item.phase === parseInt(filterPhase);
      return subjectMatch && phaseMatch;
    });
  }, [filterSubject, filterPhase]);

  const calendarEvents = useMemo(() => scheduleToEvents(filteredData), [filteredData]);

  const exportToCSV = () => {
    const headers = ['Tuần', 'Ngày', 'Thứ', 'Giờ học', 'Môn học', 'Phòng', 'Ghi chú'];
    const csvContent = [
      headers.join(','),
      ...scheduleData.map(row => 
        [row.week, row.date, row.day, row.time, `"${row.subject}"`, row.room, row.note || ''].join(',')
      )
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lich_hoc_luat.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="text-blue-600" />
                Lịch Học Luật HK2 2025-2026
              </h1>
              <p className="text-gray-600 mt-2">Quản lý và theo dõi lịch học các môn luật</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'calendar' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <LayoutGrid size={18} />
                  Lịch
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'table' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List size={18} />
                  Bảng
                </button>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download size={20} />
                Xuất CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-gray-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Bộ lọc</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Môn học</label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả môn học</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giai đoạn</label>
              <select
                value={filterPhase}
                onChange={(e) => setFilterPhase(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả giai đoạn</option>
                <option value="1">Giai đoạn 1: Trước Tết</option>
                <option value="2">Giai đoạn 2: Học kỳ chính</option>
                <option value="3">Giai đoạn 3: Chuyên ngành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tổng số buổi học</p>
                <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Số môn học</p>
                <p className="text-2xl font-bold text-gray-800">{subjects.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tuần học</p>
                <p className="text-2xl font-bold text-gray-800">23</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <Clock className="text-orange-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Nghỉ Tết</p>
                <p className="text-xl font-bold text-gray-800">Tuần 5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6" style={{ height: 600 }}>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              titleAccessor="title"
              view={calendarView}
              onView={setCalendarView}
              date={calendarDate}
              onNavigate={(date) => setCalendarDate(date)}
              culture="vi"
              components={{ toolbar: CustomToolbar }}
              messages={{
                today: 'Hôm nay',
                previous: 'Trước',
                next: 'Sau',
                month: 'Tháng',
                week: 'Tuần',
                day: 'Ngày',
                agenda: 'Danh sách',
                date: 'Ngày',
                time: 'Giờ',
                event: 'Sự kiện',
                noEventsInRange: 'Không có buổi học trong khoảng thời gian này.',
                showMore: (total: number) => `+${total} nữa`,
              }}
              eventPropGetter={(event: CalendarEvent) => {
                const phase = event.resource?.phase;
                const colors: Record<number, { backgroundColor: string }> = {
                  1: { backgroundColor: '#3b82f6' },
                  2: { backgroundColor: '#059669' },
                  3: { backgroundColor: '#7c3aed' },
                };
                return { style: colors[phase] || { backgroundColor: '#6366f1' } };
              }}
            />
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Tuần</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Ngày</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Thứ</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Giờ học</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Môn học</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phòng</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-blue-50 transition-colors ${
                      row.note ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Tuần {row.week}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.day}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-700">
                        <Clock size={14} />
                        {row.time}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-700">
                        <MapPin size={14} />
                        {row.room}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {row.note && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {row.note}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Footer note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Lưu ý:</strong> Tuần 3, 4, 5, 6 nghỉ Tết Nguyên Đán. Tuần 14, 15 không có lịch học. Các buổi có ghi chú "Buổi cuối" là buổi học cuối cùng của môn đó.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawScheduleSheet;