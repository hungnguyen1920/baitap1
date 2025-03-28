type Course = {
  id: string;
  name: string;
  lecturer: string;
  room: string;
  datename: string;
  period: string;
};

export const courses: Course[] = [
  {
    id: "SE101",
    name: "Nhap mon cong nghe phan mem",
    lecturer: "ThS. Nguyen Van A",
    room: "B4.6",
    datename: "Thu 2",
    period: "1,2,3,4",
  },
  {
    id: "MATH201",
    name: "Toan cao cap I",
    lecturer: "ThS. Nguyen Van B",
    room: "B2.1",
    datename: "Thu 3",
    period: "6,7,8,9",
  },
  // Thêm các khóa học khác ở đây
];
