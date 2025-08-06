// mockData.ts - ข้อมูล User เริ่มต้น 20 คน

export interface FormData {
    id: string;
    title: string;
    firstname: string;
    lastname: string;
    birthday: string;
    nationality: string;
    citizenId: string;
    gender: 'Male' | 'Female' | 'Unisex';
    mobilePhone: string;
    phonePrefix: string;
    passportNo: string;
    expectedSalary: string;
    idType: 'citizen' | 'passport';
  }
  
  export const mockUsers: FormData[] = [
    {
      id: '1',
      title: 'นาย',
      firstname: 'สมชาย',
      lastname: 'ใจดี',
      birthday: '1990-05-15',
      nationality: 'ไทย',
      citizenId: '1-1234-56789-12-3',
      gender: 'Male',
      mobilePhone: '0812345678',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '45000',
      idType: 'citizen'
    },
    {
      id: '2',
      title: 'นางสาว',
      firstname: 'วิชุดา',
      lastname: 'สวยงาม',
      birthday: '1992-08-22',
      nationality: 'ไทย',
      citizenId: '1-2345-67890-23-4',
      gender: 'Female',
      mobilePhone: '0823456789',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '38000',
      idType: 'citizen'
    },
    {
      id: '3',
      title: 'Mr.',
      firstname: 'John',
      lastname: 'Smith',
      birthday: '1988-03-10',
      nationality: 'American',
      citizenId: '',
      gender: 'Male',
      mobilePhone: '5551234567',
      phonePrefix: '+1',
      passportNo: 'A1234567',
      expectedSalary: '75000',
      idType: 'passport'
    },
    {
      id: '4',
      title: 'นาง',
      firstname: 'สุภาพร',
      lastname: 'รักดี',
      birthday: '1985-12-03',
      nationality: 'ไทย',
      citizenId: '1-3456-78901-34-5',
      gender: 'Female',
      mobilePhone: '0834567890',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '52000',
      idType: 'citizen'
    },
    {
      id: '5',
      title: 'Ms.',
      firstname: 'Emily',
      lastname: 'Johnson',
      birthday: '1991-07-18',
      nationality: 'British',
      citizenId: '',
      gender: 'Female',
      mobilePhone: '7712345678',
      phonePrefix: '+44',
      passportNo: 'B9876543',
      expectedSalary: '68000',
      idType: 'passport'
    },
    {
      id: '6',
      title: 'นาย',
      firstname: 'ธนากร',
      lastname: 'เก่งไก',
      birthday: '1987-11-25',
      nationality: 'ไทย',
      citizenId: '1-4567-89012-45-6',
      gender: 'Male',
      mobilePhone: '0845678901',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '55000',
      idType: 'citizen'
    },
    {
      id: '7',
      title: 'Mr.',
      firstname: 'Hiroshi',
      lastname: 'Tanaka',
      birthday: '1989-04-12',
      nationality: 'Japanese',
      citizenId: '',
      gender: 'Male',
      mobilePhone: '9012345678',
      phonePrefix: '+81',
      passportNo: 'J5432109',
      expectedSalary: '72000',
      idType: 'passport'
    },
    {
      id: '8',
      title: 'นางสาว',
      firstname: 'ปิยดา',
      lastname: 'มีสุข',
      birthday: '1993-01-30',
      nationality: 'ไทย',
      citizenId: '1-5678-90123-56-7',
      gender: 'Female',
      mobilePhone: '0856789012',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '42000',
      idType: 'citizen'
    },
    {
      id: '9',
      title: 'Mr.',
      firstname: 'Michael',
      lastname: 'Brown',
      birthday: '1986-09-08',
      nationality: 'American',
      citizenId: '',
      gender: 'Male',
      mobilePhone: '5559876543',
      phonePrefix: '+1',
      passportNo: 'A8765432',
      expectedSalary: '82000',
      idType: 'passport'
    },
    {
      id: '10',
      title: 'นาย',
      firstname: 'วิทยา',
      lastname: 'ปัญญาดี',
      birthday: '1984-06-14',
      nationality: 'ไทย',
      citizenId: '1-6789-01234-67-8',
      gender: 'Male',
      mobilePhone: '0867890123',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '48000',
      idType: 'citizen'
    },
    {
      id: '11',
      title: 'Ms.',
      firstname: 'Sarah',
      lastname: 'Wilson',
      birthday: '1990-02-28',
      nationality: 'British',
      citizenId: '',
      gender: 'Female',
      mobilePhone: '7798765432',
      phonePrefix: '+44',
      passportNo: 'B1357902',
      expectedSalary: '65000',
      idType: 'passport'
    },
    {
      id: '12',
      title: 'นางสาว',
      firstname: 'อรุณี',
      lastname: 'แสงใส',
      birthday: '1995-10-05',
      nationality: 'ไทย',
      citizenId: '1-7890-12345-78-9',
      gender: 'Female',
      mobilePhone: '0878901234',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '35000',
      idType: 'citizen'
    },
    {
      id: '13',
      title: 'Mr.',
      firstname: 'Li',
      lastname: 'Wei',
      birthday: '1988-12-20',
      nationality: 'Chinese',
      citizenId: '',
      gender: 'Male',
      mobilePhone: '13812345678',
      phonePrefix: '+86',
      passportNo: 'C2468013',
      expectedSalary: '58000',
      idType: 'passport'
    },
    {
      id: '14',
      title: 'นาย',
      firstname: 'ประยุทธ',
      lastname: 'มั่นคง',
      birthday: '1982-04-17',
      nationality: 'ไทย',
      citizenId: '1-8901-23456-89-0',
      gender: 'Male',
      mobilePhone: '0889012345',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '62000',
      idType: 'citizen'
    },
    {
      id: '15',
      title: 'Mrs.',
      firstname: 'Jennifer',
      lastname: 'Davis',
      birthday: '1983-08-11',
      nationality: 'American',
      citizenId: '',
      gender: 'Female',
      mobilePhone: '5557654321',
      phonePrefix: '+1',
      passportNo: 'A3691470',
      expectedSalary: '78000',
      idType: 'passport'
    },
    {
      id: '16',
      title: 'นางสาว',
      firstname: 'มาลิน',
      lastname: 'หอมหวาน',
      birthday: '1994-03-26',
      nationality: 'ไทย',
      citizenId: '1-9012-34567-90-1',
      gender: 'Female',
      mobilePhone: '0890123456',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '40000',
      idType: 'citizen'
    },
    {
      id: '17',
      title: 'Mr.',
      firstname: 'Ahmad',
      lastname: 'Hassan',
      birthday: '1991-05-09',
      nationality: 'Other',
      citizenId: '',
      gender: 'Male',
      mobilePhone: '96551234567',
      phonePrefix: '+965',
      passportNo: 'K7410852',
      expectedSalary: '85000',
      idType: 'passport'
    },
    {
      id: '18',
      title: 'นาย',
      firstname: 'กิตติ',
      lastname: 'เจริญสุข',
      birthday: '1986-11-13',
      nationality: 'ไทย',
      citizenId: '1-0123-45678-01-2',
      gender: 'Male',
      mobilePhone: '0901234567',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '50000',
      idType: 'citizen'
    },
    {
      id: '19',
      title: 'Ms.',
      firstname: 'Priya',
      lastname: 'Sharma',
      birthday: '1992-09-21',
      nationality: 'Other',
      citizenId: '',
      gender: 'Female',
      mobilePhone: '9812345678',
      phonePrefix: '+91',
      passportNo: 'I9517534',
      expectedSalary: '60000',
      idType: 'passport'
    },
    {
      id: '20',
      title: 'นางสาว',
      firstname: 'นิตยา',
      lastname: 'สดใส',
      birthday: '1989-07-04',
      nationality: 'ไทย',
      citizenId: '1-1357-90246-80-3',
      gender: 'Female',
      mobilePhone: '0912345678',
      phonePrefix: '+66',
      passportNo: '',
      expectedSalary: '47000',
      idType: 'citizen'
    }
  ];
  
  // ฟังก์ชันสำหรับโหลดข้อมูล mock data
  export const loadMockData = (): FormData[] => {
    return mockUsers;
  };
  
  // ฟังก์ชันสำหรับสุ่มข้อมูล user จำนวนที่ต้องการ
  export const getRandomUsers = (count: number): FormData[] => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, mockUsers.length));
  };
  
  // ฟังก์ชันสำหรับกรองข้อมูลตามเงื่อนไข
  export const filterUsersByNationality = (nationality: string): FormData[] => {
    return mockUsers.filter(user => user.nationality === nationality);
  };
  
  export const filterUsersByGender = (gender: 'Male' | 'Female' | 'Unisex'): FormData[] => {
    return mockUsers.filter(user => user.gender === gender);
  };
  
  export const filterUsersByIdType = (idType: 'citizen' | 'passport'): FormData[] => {
    return mockUsers.filter(user => user.idType === idType);
  };