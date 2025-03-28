export type Course = {
  id: string;
  name: string;
  lecturer: string;
  room: string;
  period: string;
  description?: string;
  memberCount?: number;
};

export const courses: Course[] = [
  {
    id: "SE101",
    name: "Nhap mon cong nghe phan mem",
    lecturer: "ThS. Nguyen Van A",
    room: "B4.6",
    period: "1,2,3,4",
    memberCount: 40,
  },
  {
    id: "MATH201",
    name: "Toan cao cap I",
    lecturer: "ThS. Nguyen Van B",
    room: "B2.1",
    period: "6,7,8,9",
    memberCount: 30,
  },
];
