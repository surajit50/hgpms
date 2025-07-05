import { IconType } from "react-icons/lib";
import {
  MdDashboard,
  MdAssessment,
  MdBusinessCenter,
  MdPeople,
  MdMoney,
  MdAssignment,
  MdSettingsCell,
  MdDescription,
  MdDateRange,
  MdAnnouncement,
  MdPersonAdd,
  MdSearch,
  MdFeedback,
  MdLocalLibrary,
} from "react-icons/md";
import { FaChevronCircleRight, FaChartBar } from "react-icons/fa";

export const comprehensiveFamilyRelationships: {
  English: string;
  Bengali: string;
}[] = [
  { English: "Son", Bengali: "পুত্র" },
  { English: "Father", Bengali: "বাবা" },
  { English: "Mother", Bengali: "মা" },
  { English: "Daughter", Bengali: "কন্যা" },
  { English: "Brother", Bengali: "ভাই" },
  { English: "Sister", Bengali: "বোন" },
  { English: "Grandfather", Bengali: "দাদু" },
  { English: "Grandmother", Bengali: "ঠাকুরমা" },
  { English: "Uncle", Bengali: "কাকা / মামা" },
  { English: "Aunt", Bengali: "পিসি / মাসি" },
  { English: "Cousin", Bengali: "জেঠু / দিদি" },
  { English: "Nephew", Bengali: "ভাইপো" },
  { English: "Niece", Bengali: "ভাইঝি" },
  { English: "Stepfather", Bengali: "সৎ বাবা" },
  { English: "Stepmother", Bengali: "সৎ মা" },
  { English: "Stepson", Bengali: "সৎ পুত্র" },
  { English: "Stepdaughter", Bengali: "সৎ কন্যা" },
  { English: "Half-brother", Bengali: "সৎ ভাই" },
  { English: "Half-sister", Bengali: "সৎ বোন" },
  { English: "Godfather", Bengali: "গডফাদার" },
  { English: "Godmother", Bengali: "গডমাদার" },
  { English: "Godson", Bengali: "গডসন" },
  { English: "Goddaughter", Bengali: "গডডটার" },
  { English: "Great-grandfather", Bengali: "প্রপিতামহ" },
  { English: "Great-grandmother", Bengali: "প্রমাতামহী" },
  { English: "Father-in-law", Bengali: "শ্বশুর" },
  { English: "Mother-in-law", Bengali: "শাশুড়ি" },
  { English: "Brother-in-law", Bengali: "দেওর / ভাসুর" },
  { English: "Sister-in-law", Bengali: "ননদ / জা" },
  { English: "Son-in-law", Bengali: "জামাই" },
  { English: "Daughter-in-law", Bengali: "বউমা" },
  { English: "Great-uncle", Bengali: "জ্যাঠামশাই" },
  { English: "Great-aunt", Bengali: "ঠাকুমা" },
  { English: "Grandson (daughter's son)", Bengali: "নাতি (মেয়ের পুত্র)" },
  {
    English: "Granddaughter (daughter's daughter)",
    Bengali: "নাতনি (মেয়ের কন্যা)",
  },
  { English: "Grandson (son's son)", Bengali: "নাতি (পুত্রের পুত্র)" },
  {
    English: "Granddaughter (son's daughter)",
    Bengali: "নাতনি (পুত্রের কন্যা)",
  },
  {
    English: "Great-grandson (son's grandson)",
    Bengali: "প্রপৌত্র (পুত্রের নাতি)",
  },
  {
    English: "Great-granddaughter (son's granddaughter)",
    Bengali: "প্রপৌত্রী (পুত্রের নাতনি)",
  },
  {
    English: "Great-grandson (daughter's grandson)",
    Bengali: "প্রপৌত্র (মেয়ের নাতি)",
  },
  {
    English: "Great-granddaughter (daughter's granddaughter)",
    Bengali: "প্রপৌত্রী (মেয়ের নাতনি)",
  },
  { English: "Stepbrother", Bengali: "সৎ ভাই" },
  { English: "Stepsister", Bengali: "সৎ বোন" },
  { English: "Brother's son", Bengali: "ভাইপো" },
  { English: "Brother's daughter", Bengali: "ভাইঝি" },
  { English: "Sister's son", Bengali: "বোনপো" },
  { English: "Sister's daughter", Bengali: "বোনঝি" },
  { English: "Father's elder brother", Bengali: "জ্যাঠা" },
  { English: "Father's younger brother", Bengali: "কাকা" },
  { English: "Mother's elder sister", Bengali: "বড় মাসি" },
  { English: "Mother's younger sister", Bengali: "ছোট মাসি" },
  { English: "Paternal cousin", Bengali: "জ্যাঠাত ভাই / বোন" },
  { English: "Maternal cousin", Bengali: "মামাত ভাই / বোন" },
  { English: "Paternal aunt's son", Bengali: "পিসত ভাই" },
  { English: "Paternal aunt's daughter", Bengali: "পিসত বোন" },
  { English: "Maternal uncle's son", Bengali: "মামাত ভাই" },
  { English: "Maternal uncle's daughter", Bengali: "মামাত বোন" },
  { English: "Father's second wife", Bengali: "সৎ মা" },
  { English: "Mother's second husband", Bengali: "সৎ বাবা" },
  { English: "Foster father", Bengali: "পালক বাবা" },
  { English: "Foster mother", Bengali: "পালক মা" },
  { English: "Foster son", Bengali: "পালিত পুত্র" },
  { English: "Foster daughter", Bengali: "পালিত কন্যা" },
  { English: "Brother-in-law (wife's brother)", Bengali: "শালা" },
  { English: "Sister-in-law (husband's sister)", Bengali: "ননদ" },
  { English: "Co-sister-in-law", Bengali: "জা" },
  { English: "Co-brother-in-law", Bengali: "শ্যালক" },
  { English: "Granduncle", Bengali: "দাদার ভাই / নানার ভাই" },
  { English: "Grandaunt", Bengali: "দিদিমার বোন / নানীর বোন" },
  { English: "Great-nephew", Bengali: "ভাইপোর ছেলে / বোনপোর ছেলে" },
  { English: "Great-niece", Bengali: "ভাইঝির মেয়ে / বোনঝির মেয়ে" },
  { English: "Grandnephew", Bengali: "ভাইপোর নাতি / বোনপোর নাতি" },
  { English: "Grandniece", Bengali: "ভাইঝির নাতনি / বোনঝির নাতনি" },
  { English: "Son's father-in-law", Bengali: "পুত্রবধূর বাবা" },
  { English: "Son's mother-in-law", Bengali: "পুত্রবধূর মা" },
  { English: "Daughter's father-in-law", Bengali: "জামাইর বাবা" },
  { English: "Daughter's mother-in-law", Bengali: "জামাইর মা" },
  { English: "Husband", Bengali: "স্বামী" },
  { English: "Wife", Bengali: "স্ত্রী" },
];

export const herosectionImageSrc = [
  {
    imgsrc:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1694944115/heroImage/heroImage_gctqcl.jpg",
    altname: "Hero image 1",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAAUABgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOwooooA/9k=",
  },
  {
    imgsrc:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1696745505/heroImage/1696741270429_l833bb.jpg",
    altname: "Hero image 2",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAAUABgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOwooooA/9k=",
  },
  {
    imgsrc:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1696745499/heroImage/1696741343240_i3fnwm.jpg",
    altname: "Hero image 3",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAAUABgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOwooooA/9k=",
  },
];

export const PanchayatMembers = [
  {
    GRAMSANSADNO: 1,
    Name: "SUCHITRA MONDAL BARMAN",
    Contact: "8513995244",
    Email: "member1@email.com",
    DOB: "07-23-1989",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158250/IMG_20231024_195504_sushay.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Dabra",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 2,
    Name: "ALOKA SINGH",
    Contact: "9561961838",
    Email: "member2@email.com",
    DOB: "01-01-1987",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158240/IMG_20231024_195810_ffkgi1.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Chapahat",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 3,
    Name: "RAJU SAREN",
    Contact: "7363076287",
    Email: "member3@email.com",
    DOB: "03-22-1976",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158230/IMG_20231024_195641_dfbfsg.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Iswarpara",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 4,
    Name: "BIJALI HANSDA",
    Contact: "9775429598",
    Email: "member3@email.com",
    DOB: "02-10-1976",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Srirampur",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 5,
    Name: "MRITYUNJAY DAS",
    Contact: "9609576114",
    Email: "member3@email.com",
    DOB: "06-20-1995",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "SoJ-Sanchalak",
    SansadName: "Lalpur 1",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 6,
    Name: "RAKHI BARMAN ROY",
    Contact: "9064221367",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158238/IMG_20231024_195540_ntlulj.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "KPB-Sanchalak",
    SansadName: "Lalpur 2",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 7,
    Name: "BITHIKA GHOSH",
    Contact: "8293245832",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698161664/IMG_20231024_210228_dyy8dw.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Prodhan",
    SansadName: "West Kismatdapat 1",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 8,
    Name: "MAMONI ROY BARMAN",
    Contact: "7865968203",
    Email: "member3@email.com",
    DOB: "10-15-1988",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "West Kismatdapat 2",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 9,
    Name: "JHANTU GHOSH",
    Contact: "9735055118",
    Email: "member3@email.com",
    DOB: "11-21-1987",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "East Kismatdapat",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 10,
    Name: "RANJAN MAHANTA",
    Contact: "8972795919",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Chakdapat 1",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 10,
    Name: "IRA MANDAL SINGHO ROY",
    Contact: "9735583156",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Chakdapat 2",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 11,
    Name: "JYOTSNA ROY",
    Contact: "8597167966",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158236/IMG_20231024_195931_epohpj.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Chakmohan",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 12,
    Name: "BIPLAB MAHATO",
    Contact: "9563326281",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698153937/IMG_20231024_184956_wwvn9z.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Lalpur",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 13,
    Name: "TAPASI DAS",
    Contact: "7908731449",
    Email: "member3@email.com",
    DOB: "01-18-1990",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Mulahat",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 14,
    Name: "GOUTAM PAUL",
    Contact: "8972489736",
    Email: "member3@email.com",
    DOB: "03-22-1993",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "SoP-Sanchalak",
    SansadName: "Mahishnota",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 15,
    Name: "BELAL HOSSAIN MONDAL",
    Contact: "9733416513",
    Email: "member3@email.com",
    DOB: "10-03-1992",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Laskarpur",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 16,
    Name: "PAMPA SARKAR",
    Contact: "9735217796",
    Email: "member3@email.com",
    DOB: "01-14-1981",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158248/IMG_20231024_195903_urczbh.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "NSUSK-Sanchalak",
    SansadName: "Dhalpara",
    Gender: "Female",
  },
  {
    GRAMSANSADNO: 17,
    Name: "MOSTAFIJUR MONDAL",
    Contact: "7047500705",
    Email: "member3@email.com",
    DOB: "10-12-1994",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Upa Prodhan",
    SansadName: "Uttar Jamalpur",
    Gender: "Male",
  },
  {
    GRAMSANSADNO: 18,
    Name: "ARUN MAHATO",
    Contact: "9775166441",
    Email: "member3@email.com",
    DOB: "01-01-1988",
    Photo:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698154472/IMG_20231024_190207_teq5lj.jpg",
    TermYear: "2022-2027",
    Status: "Active",
    Designation: "Member",
    SansadName: "Srikrisnapur",
    Gender: "Male",
  },
];

export const villageData2 = [
  {
    villageName: "Dabra",
    totalVoters: { male: 300, female: 350 },
    totalPopulation: { male: 700, female: 800 },
    memberName: "SUCHITRA MONDAL BARMAN",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158250/IMG_20231024_195504_sushay.jpg",
    phoneNumber: "8513995244",
    jsNo: "001",
    noOfHouseholds: 120,
  },
  {
    villageName: "Iswarpara",
    totalVoters: { male: 400, female: 450 },
    totalPopulation: { male: 800, female: 900 },
    memberName: "RAJU SAREN",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158230/IMG_20231024_195641_dfbfsg.jpg",
    phoneNumber: "7363076287",
    jsNo: "002",
    noOfHouseholds: 140,
  },
  {
    villageName: "Srirampur",
    totalVoters: { male: 200, female: 250 },
    totalPopulation: { male: 500, female: 600 },
    memberName: "BIJALI HANSDA",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "9775429598",
    jsNo: "003",
    noOfHouseholds: 100,
  },
  {
    villageName: "Lalpur 1",
    totalVoters: { male: 350, female: 400 },
    totalPopulation: { male: 750, female: 850 },
    memberName: "MRITYUNJAY DAS",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "9609576114",
    jsNo: "004",
    noOfHouseholds: 130,
  },
  {
    villageName: "Lalpur 2",
    totalVoters: { male: 400, female: 450 },
    totalPopulation: { male: 850, female: 950 },
    memberName: "RAKHI BARMAN ROY",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158238/IMG_20231024_195540_ntlulj.jpg",
    phoneNumber: "9064221367",
    jsNo: "005",
    noOfHouseholds: 135,
  },
  {
    villageName: "West Kismatdapat 1",
    totalVoters: { male: 320, female: 350 },
    totalPopulation: { male: 700, female: 750 },
    memberName: "BITHIKA GHOSH",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698161664/IMG_20231024_210228_dyy8dw.jpg",
    phoneNumber: "8293245832",
    jsNo: "006",
    noOfHouseholds: 120,
  },
  {
    villageName: "West Kismatdapat 2",
    totalVoters: { male: 300, female: 330 },
    totalPopulation: { male: 600, female: 700 },
    memberName: "MAMONI ROY BARMAN",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "7865968203",
    jsNo: "007",
    noOfHouseholds: 110,
  },
  {
    villageName: "East Kismatdapat",
    totalVoters: { male: 400, female: 450 },
    totalPopulation: { male: 850, female: 950 },
    memberName: "JHANTU GHOSH",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "9735055118",
    jsNo: "008",
    noOfHouseholds: 140,
  },
  {
    villageName: "Chakdapat 1",
    totalVoters: { male: 350, female: 400 },
    totalPopulation: { male: 750, female: 850 },
    memberName: "RANJAN MAHANTA",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "8972795919",
    jsNo: "009",
    noOfHouseholds: 130,
  },
  {
    villageName: "Chakdapat 2",
    totalVoters: { male: 320, female: 350 },
    totalPopulation: { male: 700, female: 750 },
    memberName: "IRA MANDAL SINGHO ROY",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "9735583156",
    jsNo: "010",
    noOfHouseholds: 120,
  },
  {
    villageName: "Chakmohan",
    totalVoters: { male: 300, female: 350 },
    totalPopulation: { male: 650, female: 750 },
    memberName: "JYOTSNA ROY",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158236/IMG_20231024_195931_epohpj.jpg",
    phoneNumber: "8597167966",
    jsNo: "011",
    noOfHouseholds: 125,
  },
  {
    villageName: "Mulahat",
    totalVoters: { male: 250, female: 300 },
    totalPopulation: { male: 600, female: 700 },
    memberName: "TAPASI DAS",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "7908731449",
    jsNo: "012",
    noOfHouseholds: 110,
  },
  {
    villageName: "Mahishnota",
    totalVoters: { male: 370, female: 400 },
    totalPopulation: { male: 750, female: 850 },
    memberName: "GOUTAM PAUL",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "8972489736",
    jsNo: "013",
    noOfHouseholds: 140,
  },
  {
    villageName: "Laskarpur",
    totalVoters: { male: 350, female: 400 },
    totalPopulation: { male: 750, female: 850 },
    memberName: "BELAL HOSSAIN MONDAL",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "9733416513",
    jsNo: "014",
    noOfHouseholds: 130,
  },
  {
    villageName: "Dhalpara",
    totalVoters: { male: 280, female: 320 },
    totalPopulation: { male: 600, female: 700 },
    memberName: "PAMPA SARKAR",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158248/IMG_20231024_195903_urczbh.jpg",
    phoneNumber: "9735217796",
    jsNo: "015",
    noOfHouseholds: 110,
  },
  {
    villageName: "Uttar Jamalpur",
    totalVoters: { male: 370, female: 400 },
    totalPopulation: { male: 800, female: 900 },
    memberName: "MOSTAFIJUR MONDAL",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697867382/demomember_avlg9n.png",
    phoneNumber: "7047500705",
    jsNo: "016",
    noOfHouseholds: 150,
  },
  {
    villageName: "Srikrisnapur",
    totalVoters: { male: 320, female: 350 },
    totalPopulation: { male: 700, female: 750 },
    memberName: "ARUN MAHATO",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698154472/IMG_20231024_190207_pcxkln.jpg",
    phoneNumber: "9735136823",
    jsNo: "017",
    noOfHouseholds: 130,
  },
  {
    villageName: "Debipur",
    totalVoters: { male: 300, female: 350 },
    totalPopulation: { male: 650, female: 750 },
    memberName: "MAYADHAR SAHA",
    memberImage:
      "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1698158244/IMG_20231024_195710_sbjh3l.jpg",
    phoneNumber: "7047599367",
    jsNo: "018",
    noOfHouseholds: 120,
  },
];





export const relationshipOptions = [
  { value: "father", label: "Father" },
  { value: "son", label: "Son" },
  { value: "brother", label: "Brother" },
  { value: "fatherInLaw", label: "Father-in-law" },
  { value: "grandson", label: "Grandson" },
  { value: "grandfather", label: "Grand Father" },
  { value: "husband", label: "husband" },
  { value: "wife", label: "Wife" },
  { value: "mother", label: "Mother" },
  { value: "daughter", label: "Daughter" },
  { value: "sister", label: "Sister" },
  { value: "motherInLaw", label: "Mother-In-Law" },
  { value: "granddaughter", label: "Grand Draughter" },
  { value: "grandmother", label: "Grand Mother" },
  { value: "daughterInLaw", label: "Daughter-in-law" },
];

export const villagenameOption = [
  { value: "Dabra", label: "Dabra" },
  { value: "Iswarpara", label: "Iswarpara" },
  { value: "Bhimpur", label: "Bhimpur" },

  { value: "Srirampur", label: "Srirampur" },
  { value: "Lalpur", label: "Lalpur" },

  { value: "Uttar Jamalpur", label: "Uttar Jamalpur" },

  { value: "Srikrishnapur", label: "Srikrishnapur" },
  { value: "Purbba Gobindapur", label: "Purbba Gobindapur" },
  { value: "Purba Kalikapur", label: "Purba Kalikapur" },
  { value: "Dhalpara", label: "Dhalpara" },
  { value: "Purbba Thakurpur", label: "Purbba Thakurpur" },
  { value: "Kismat Dapt", label: "Kismat Dapt" },
  { value: "Chakdapat", label: "Chakdapat" },
  { value: "Chapahat", label: "Chapahat" },
  { value: "Chak Mohan", label: "Chak Mohan" },
  { value: "Basanta", label: "Basanta" },
  { value: "Muraripur", label: "Muraripur" },
  { value: "Mulahat", label: "Mulahat" },
  { value: "Mahishnota", label: "Mahishnota" },
  { value: "Jantipur", label: "Jantipur" },
  { value: "Purbba Jagannathpur", label: "Purbba Jagannathpur" },
  { value: "Laskarpur", label: "Laskarpur" },
  { value: "Sarenbari", label: "Sarenbari" },
];

{
  /*
  value: string; label: string*/
}
export const genderoption = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const materialstatusOption = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
];

export const bloodgroup = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];


        
  
export interface PanchayatwebsidemenuProps {
  menuItemText: string
  menuItemLink?: string
  submenu: boolean
  subMenuItems: PanchayatwebsidemenuProps[]
}

export const Panchayatwebsidemenu: PanchayatwebsidemenuProps[] = [
  {
    menuItemText: "Home",
    menuItemLink: "/",
    submenu: false,
    subMenuItems: [],
  },

  {
    menuItemText: "About Us",
    menuItemLink: "/about",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Introduction to Gram Panchayat",
        menuItemLink: "/about",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "History and Evolution",
        menuItemLink: "/about/history",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Vision and Mission",
        menuItemLink: "/about/vision-mission",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Geographic Information",
        menuItemLink: "/about/geography",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Demographics",
        menuItemLink: "/about/demographics",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Administration",
    menuItemLink: "/administration",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Panchayat Members",
        menuItemLink: "/administration/members",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Functions and Responsibilities",
        menuItemLink: "/administration/functions",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Meetings and Minutes",
        menuItemLink: "/meetings",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Organizational Structure",
        menuItemLink: "/administration/structure",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Staff Directory",
        menuItemLink: "/administration/staff",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Citizen Services",
    menuItemLink: "/services",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Birth & Death Certificates",
        menuItemLink: "/services/certificates",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Property Tax Services",
        menuItemLink: "/services/property-tax",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Trade License",
        menuItemLink: "/services/trade-license",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Building Permission",
        menuItemLink: "/services/building-permission",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Water Connection",
        menuItemLink: "/services/water-connection",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Grievance Portal",
        menuItemLink: "/grievance",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Development Projects",
    menuItemLink: "/development",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Ongoing Projects",
        menuItemLink: "/development/ongoing",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Completed Projects",
        menuItemLink: "/development/completed",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Planned Projects",
        menuItemLink: "/development/planned",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Infrastructure Development",
        menuItemLink: "/development/infrastructure",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Schemes and Initiatives",
    menuItemLink: "/schemes",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Central Government Schemes",
        menuItemLink: "/schemes/central",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "State Government Schemes",
        menuItemLink: "/schemes/state",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "MGNREGA",
        menuItemLink: "/schemes/mgnrega",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "PM Awas Yojana",
        menuItemLink: "/schemes/pmay",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Swachh Bharat Mission",
        menuItemLink: "/schemes/swachh-bharat",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Digital India",
        menuItemLink: "/schemes/digital-india",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Transparency",
    menuItemLink: "/transparency",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "RTI Information",
        menuItemLink: "/rti",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Budget & Expenditure",
        menuItemLink: "/budget",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Tenders & Procurement",
        menuItemLink: "/tenders",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Audit Reports",
        menuItemLink: "/transparency/audit",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Annual Reports",
        menuItemLink: "/transparency/annual-reports",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "News and Updates",
    menuItemLink: "/news",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Latest News",
        menuItemLink: "/news/latest",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Announcements",
        menuItemLink: "/news/announcements",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Press Releases",
        menuItemLink: "/news/press-releases",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Events Calendar",
        menuItemLink: "/news/events",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Photo Gallery",
    menuItemLink: "/gallery",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Development Projects",
        menuItemLink: "/gallery?tab=development",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Community Events",
        menuItemLink: "/gallery?tab=events",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Infrastructure",
        menuItemLink: "/gallery?tab=infrastructure",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Cultural Heritage",
        menuItemLink: "/gallery?tab=culture",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Official Events",
        menuItemLink: "/gallery?tab=officials",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Daily Life",
        menuItemLink: "/gallery?tab=daily-life",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Downloads",
    menuItemLink: "/downloads",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Application Forms",
        menuItemLink: "/downloads/forms",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Certificates & Documents",
        menuItemLink: "/downloads/certificates",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Guidelines & Procedures",
        menuItemLink: "/downloads/guidelines",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Annual Reports",
        menuItemLink: "/downloads/reports",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Tender Documents",
        menuItemLink: "/downloads/tenders",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Resources",
    menuItemLink: "/resources",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Important Links",
        menuItemLink: "/resources/links",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Government Portals",
        menuItemLink: "/resources/government-portals",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Emergency Contacts",
        menuItemLink: "/resources/emergency",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Useful Information",
        menuItemLink: "/resources/information",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "Contact Us",
    menuItemLink: "/contact",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "Office Information",
        menuItemLink: "/contact",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Staff Directory",
        menuItemLink: "/contact/directory",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Location & Map",
        menuItemLink: "/contact/location",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Feedback Form",
        menuItemLink: "/contact/feedback",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },

  {
    menuItemText: "FAQ",
    menuItemLink: "/faq",
    submenu: true,
    subMenuItems: [
      {
        menuItemText: "General Questions",
        menuItemLink: "/faq/general",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Service Related",
        menuItemLink: "/faq/services",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Scheme Information",
        menuItemLink: "/faq/schemes",
        submenu: false,
        subMenuItems: [],
      },
      {
        menuItemText: "Online Services",
        menuItemLink: "/faq/online",
        submenu: false,
        subMenuItems: [],
      },
    ],
  },
]

export const MemberdetailsForm = [
  {
    label: "Members Basic Information",
    fields: [
      {
        name: "salutation",
        placeholder: "Salutation",
      },
      {
        name: "firstName",
        placeholder: "",
      },
      {
        name: "middleName",
        placeholder: "",
      },
      {
        name: "lastName",
        placeholder: "",
      },
      {
        name: "FatherOrGuardianName",
        placeholder: "",
      },
      {
        name: "DOB",
        placeholder: "",
      },
      {
        name: "Gender",
        placeholder: "",
      },
      {
        name: "MaritalStatus",
        placeholder: "",
      },
      {
        name: "Religion",
        placeholder: "",
      },
      {
        name: "Caste",
        placeholder: "",
      },
      {
        name: "EduQualification",
        placeholder: "",
      },
      {
        name: "ComputerLiterate",
        placeholder: "",
      },
      {
        name: "MotherTongue",
        placeholder: "",
      },
      {
        name: "BloodGroup",
        placeholder: "",
      },
    ],
  },
  {
    label: "Contact Details",
    fields: [
      {
        name: "ContactNo",
        placeholder: "",
      },
      {
        name: "WhatsappNo",
        placeholder: "",
      },
      {
        name: "Email",
        placeholder: "",
      },
    ],
  },
  {
    label: "Residential Address",
    fields: [
      {
        name: "Street",
        placeholder: "",
      },
      {
        name: "PIN",
        placeholder: "",
      },
      {
        name: "PostOffice",
        placeholder: "",
      },
      {
        name: "District",
        placeholder: "",
      },
      {
        name: "PoliceStation",
        placeholder: "",
      },
    ],
  },
  {
    label: "ID Details",
    fields: [
      {
        name: "AADHAR",
        placeholder: "",
      },
      {
        name: "PAN",
        placeholder: "",
      },
      {
        name: "EPIC",
        placeholder: "",
      },
    ],
  },
  {
    label: "Profession And Income",
    fields: [
      {
        name: "Profession",
        placeholder: "",
      },
      {
        name: "AnnualFamilyIncome",
        placeholder: "",
      },
    ],
  },
];

export const govtscmeLink = [
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473512/Aikyashree_eikpgm.png",
    description: {
      schemename: "Aikyashree",
      description:
        "To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473478/Lakshmir_Bhandar_b2zu94.webp",
    description: {
      schemename: "Lakshmir Bhander",
      description:
        "Lakshmir Bhander To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473526/Rupashree_oa0myt.png",
    description: {
      schemename: "Rupashree",
      description:
        "Rupashree To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1696306504/yj5ntypfiqdwitej3i4p.png",
    description: {
      schemename: "kishakbandhu",
      description:
        "kishakbandhu To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },

  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473478/Lakshmir_Bhandar_b2zu94.webp",
    description: {
      schemename: "Lakshmir Bhander",
      description:
        "Lakshmir Bhander To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473526/Rupashree_oa0myt.png",
    description: {
      schemename: "Rupashree",
      description:
        "Rupashree To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1696306504/yj5ntypfiqdwitej3i4p.png",
    description: {
      schemename: "kishakbandhu",
      description:
        "kishakbandhu To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473486/Kanyashree_kzts97.png",
    description: {
      schemename: "Kanyashree",
      description:
        "Kanyashree To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473512/Aikyashree_eikpgm.png",
    description: {
      schemename: "Aikyashree",
      description:
        "To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
  {
    src: "https://res.cloudinary.com/dqkmkxgdo/image/upload/v1697473478/Lakshmir_Bhandar_b2zu94.webp",
    description: {
      schemename: "Lakshmir Bhander",
      description:
        "Lakshmir Bhander To make your document look professionally produced, Word provideheader footer cover page, and text box designs that complementeach other For example",
    },
  },
];

export const tenderNoticeTermsAndCondition = [
  {
    heading: {
      gpname: "NO-3 DHALPARA GRAM PANCHAYAT",
      gpaddress: "P.O- TRIMOHINI, P.S.- HILI",
    },
    eligibleCriteriaOfBidder: [
      {
        annextur1criteria: [
          "The prospective bidders shall have satisfactorily completed as a prime agency during the last 3 (Three) years prior to the date of issue of this Notice at least one work of similar nature under authority of State/Central Govt., Central/State Government undertaking/Statutory Bodies and having 60% (Sixty percent) (as per PWD and P&RD norms) of the estimated amount put to tender. Such work should be executed in the Government Sector, Zilla Parishad, Panchayat Samity, Gram Panchayat, or Public Sector undertaking. Please note that credential means Payment certificate (where NIT No., Memo. No., Fund, Name of Work, Work Order Memo. No., M.B.No., Page No., Bill amounts including necessary deductions, Voucher No. & date, PAN, GST Regn. No. etc. to be furnished clearly) which will be tagged with Work Order & Completion Certificate. A credential will not be used for more than one work i.e. multi-use of a single credential will not be allowed otherwise the tender may be treated as cancelled.",

          "Photo copies of valid Pan Card, Valid 15-digit Goods and Services Tax registration Number (GSTIN) and up to date GST return under GST Act, 2017 must be uploaded in the appropriate folder. In case of Registered Engineering Co-Operative Societies and Registered Labour Co-Operative Societies, they are required to furnish a valid Bye Law, Current Audit Report, Valid Clearance Certificate from A.R.C.S. for the year 2021-22 along with other relevant supporting documents. Authorized persons should sign the tender documents along with technical Bid documents. During scrutiny of Technical Bid/ Tender documents, if it is found that any information is incorrect, the technical bid / tender documents will be rejected without assigning any reason. The Artho-O-Parikalpana Upo-samiti of DHALPARA Gram Panchayat office will have the sole discretion to decide the eligibility of the Contractor on the basis of submitted documents and evaluation, and also reserves the right to refuse any explanation to the Contractor without assigning any reason. The decision of the DHALPARA Gram Panchayat office authority will be final in this respect.",
          "Intending bidders have to submit their bid online through e-procurement (two cover systems) portal of http://www.wbtenders.gov.in. The scan copy of the Tender Fee/Participation charge and earnest money is to be uploaded in the appropriate folder. The hard copy of the Tender Fee/Participation charge and EMD challan is to be deposited after opening of the Technical bid to the Office of the undersigned.",
          "The L1 bidder will have to show or submit original testimonials as the case may be after the opening of Technical Bid.",
          "Bids from joint ventures are not allowed.",
          "Where an individual person holds a digital certificate in his own name duly issued to him against the company or the firm of which he happens to be a director or partner, such individual person shall upload a copy of registered power of attorney showing authorization in his favor by the rest of the directors or partners to upload the tender.",
          "If for any reason the lowest tender is not accepted, the Artho-O-Parikalpana Upo-Samity will make the final decision regarding tender finalization.",
          "The authority of DHALPARA GP reserves the right to accept or reject any or all the tenders.",
          "Bids shall remain valid for a period not less than 120 days from the last date of submission of the Financial/Sealed Bid. If the bidder withdraws the bid during this period, the earnest money deposited will be forfeited.",
          "Intending bidders should know that the rates in the BOQs are inclusive of all duties, taxes, royalties, cess, toll taxes, and other levies.",
          "In this tender, no arbitration will be allowed.",
          "No credential will be considered unless supported by Payment certificate, Work Order & Completion Certificate.",
          "If any tenderer fails to produce the original hard copies or documents on demand, penal action will be taken.",
          "No mobilization/secured advance will be allowed to the selected agency.",
          "The intending bidders or any of their constituent partners shall neither have abandoned any work nor have their contracts been rescinded during the last 3 years.",
          "The bidders are encouraged to visit and examine the work site at their own expense.",
          "Additional performance security @10% of the tendered amount shall be deposited when the bid rate is 20% or more below the estimated amount.",
        ],
      },

      {
        annetur2cateteial: [],
      },
    ],
  },
];

export const memberFormformSections = [
  {
    setp: 1,
    title: "Members Basic Information",
    fields: [
      "salutation",
      "firstName",
      "middleName",
      "lastName",
      "fatherGuardianName",
      "dob",
      "gender",
      "maritalStatus",
    ],
  },
  {
    setp: 2,
    title: "Additional Information",
    fields: [
      "religion",
      "caste",
      "eduQualification",
      "computerLiterate",
      "motherTongue",
      "bloodGroup",
    ],
  },
  {
    setp: 3,
    title: "Contact Details",
    fields: ["contactNo", "whatsappNo", "email"],
  },
  {
    setp: 4,
    title: "Residential Address",
    fields: [
      "address",
      "village",
      "pin",
      "postOffice",
      "district",
      "policeStation",
    ],
  },
  {
    setp: 5,
    title: "ID Details",
    fields: ["aadhar", "pan", "epic"],
  },
  {
    title: "Profession And Income",
    fields: ["profession", "annualFamilyIncome"],
  },
  {
    title: "Upload Photo",
    fields: ["photo"],
  },
];

export const selectOptions = {
  salutation: ["Mr", "Mrs", "Ms"],
  gender: ["male", "female", "other"],
  maritalStatus: ["single", "married", "divorced", "widowed"],
  computerLiterate: ["yes", "no"],
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  caste: ["General", "OBC", "SC", "ST", "Other"],
  eduQualification: [
    "High School",
    "Undergraduate",
    "Postgraduate",
    "PhD",
    "Other",
  ],
  motherTongue: ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Other"],
  religion: [
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Buddhist",
    "Jain",
    "Other",
  ], // Added religion options
  village: villagenameOption.map((village) => village.value),
};

export const familyRelationships = [
  { value: "Son", label: "Son" },
  { value: "Daughter", label: "Daughter" },
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
  { value: "Grandfather", label: "Grandfather" },
  { value: "Grandmother", label: "Grandmother" },
  { value: "Grandson", label: "Grandson" },
  { value: "Granddaughter", label: "Granddaughter" },
  { value: "Uncle", label: "Uncle" },
  { value: "Aunt", label: "Aunt" },
  { value: "Nephew", label: "Nephew" },
  { value: "Niece", label: "Niece" },
  { value: "Cousin", label: "Cousin" },
  { value: "Step-father", label: "Step-father" },
  { value: "Step-mother", label: "Step-mother" },
  { value: "Step-son", label: "Step-son" },
  { value: "Step-daughter", label: "Step-daughter" },
  { value: "Step-brother", label: "Stepbrother" },
  { value: "Step-sister", label: "Stepsister" },
  { value: "Half-Brother", label: "Half-Brother" },
  { value: "HalfSister", label: "Half-Sister" },
  { value: "Father-In-Law", label: "Father-in-Law" },
  { value: "Mother-In-Law", label: "Mother-in-Law" },
  { value: "Son-In-Law", label: "Son-in-Law" },
  { value: "Daughter-In-Law", label: "Daughter-in-Law" },
  { value: "Brother-In-Law", label: "Brother-in-Law" },
  { value: "Sister-In-Law", label: "Sister-in-Law" },
];

export const maleRelationships = [
  { value: "Son", label: "Son" },
  { value: "Father", label: "Father" },
  { value: "Brother", label: "Brother" },
  { value: "Grandfather", label: "Grandfather" },
  { value: "Husband", label: "Husband" },
  { value: "Grandson", label: "Grandson" },
  { value: "Uncle", label: "Uncle" },
  { value: "Nephew", label: "Nephew" },
  { value: "Cousin", label: "Cousin" },
  { value: "Stepfather", label: "Stepfather" },
  { value: "Stepson", label: "Stepson" },
  { value: "Stepbrother", label: "Stepbrother" },
  { value: "HalfBrother", label: "Half-Brother" },
  { value: "FatherInLaw", label: "Father-in-Law" },
  { value: "SonInLaw", label: "Son-in-Law" },
  { value: "BrotherInLaw", label: "Brother-in-Law" },
  { value: "Greatgrandson", label: "Great-grandSon" },
  { value: "GreatNephew", label: "Great-Nephew" },
];

export const femaleRelationships = [
  { value: "Daughter", label: "Daughter" },
  { value: "Wife", label: "Wife" },
  { value: "Mother", label: "Mother" },
  { value: "Sister", label: "Sister" },
  { value: "Grandmother", label: "Grandmother" },
  { value: "Granddaughter", label: "Granddaughter" },
  { value: "Aunt", label: "Aunt" },
  { value: "Niece", label: "Niece" },
  { value: "Cousin", label: "Cousin" },
  { value: "Stepmother", label: "Stepmother" },
  { value: "Stepdaughter", label: "Stepdaughter" },
  { value: "Stepsister", label: "Stepsister" },
  { value: "HalfSister", label: "Half-Sister" },
  { value: "MotherInLaw", label: "Mother-in-Law" },
  { value: "DaughterInLaw", label: "Daughter-in-Law" },
  { value: "GranddaughterInLaw", label: "Granddaughter-in-Law" },
  { value: "SisterInLaw", label: "Sister-in-Law" },
  { value: "GreatgranddaughterInLaw", label: "Great-granddaughter-in-Law" },
  { value: "Greatgranddaughter", label: "Great-granddaughter" },
  { value: "GreatNiece", label: "Great-Niece" },
];

export const PANCHAYAT_NAME = "Dhalpara Gram Panchayat";

export const HISTORY = `
Dhalpara Gram Panchayat was established in 1952 as part of India's democratic decentralization process. 
Located in the heart of rural West Bengal, it has played a crucial role in local governance and community development for over seven decades.
`;

// Existing constants remain unchanged

export const E_GOVERNANCE_SERVICES = {
  onlineApplications: [
    {
      name: "Birth Certificate",
      description: "Apply for a birth certificate online",
    },
    {
      name: "Death Certificate",
      description: "Request a death certificate through our portal",
    },
    {
      name: "Income Certificate",
      description: "Apply for an income certificate electronically",
    },
    {
      name: "Residence Certificate",
      description: "Get your residence certificate online",
    },
  ],
  documentVerification: [
    {
      name: "Aadhaar Verification",
      description: "Verify Aadhaar details online",
    },
    {
      name: "Voter ID Verification",
      description: "Check and verify voter ID information",
    },
    { name: "Land Records", description: "Verify land ownership and records" },
    {
      name: "Caste Certificate",
      description: "Online verification of caste certificates",
    },
  ],
  grievanceRedressal: [
    { name: "File a Complaint", description: "Submit your grievances online" },
    {
      name: "Track Complaint Status",
      description: "Check the status of your filed complaints",
    },
    {
      name: "Feedback Submission",
      description: "Provide feedback on our services",
    },
    {
      name: "Escalation",
      description: "Escalate unresolved issues to higher authorities",
    },
  ],
};

export const HISTORY_TIMELINE = [
  {
    year: 1952,
    title: "Establishment",
    description:
      "Dhalpara Gram Panchayat was officially established as part of India's democratic decentralization process.",
  },
  {
    year: 1975,
    title: "First Development Plan",
    description:
      "Implemented the first comprehensive village development plan, focusing on agriculture and education.",
  },
  {
    year: 1992,
    title: "Women's Empowerment Initiative",
    description:
      "Launched a pioneering program to increase women's participation in local governance.",
  },
  {
    year: 2005,
    title: "E-Governance Introduction",
    description:
      "Introduced computerization and basic e-governance services to improve transparency and efficiency.",
  },
  {
    year: 2015,
    title: "Sustainable Development Goals Alignment",
    description:
      "Aligned local development plans with UN Sustainable Development Goals, focusing on poverty alleviation and environmental sustainability.",
  },
  {
    year: 2020,
    title: "Digital Village Initiative",
    description:
      "Launched a comprehensive digital literacy program and expanded e-governance services.",
  },
];

export const TEAM = [
  {
    name: "Amit Roy",
    position: "Pradhan (President)",
    bio: "With over 15 years of experience in local governance, Amit Roy leads our panchayat with dedication and vision.",
    email: "amit.roy@dhalparapanchayat.gov.in",
  },
  {
    name: "Priya Sharma",
    position: "Upa-Pradhan (Vice-President)",
    bio: "Priya Sharma brings her expertise in community development and women's empowerment to her role as Vice-President.",
    email: "priya.sharma@dhalparapanchayat.gov.in",
  },
  {
    name: "Rajesh Mondal",
    position: "Sanchalak, Education Committee",
    bio: "As a former teacher, Rajesh Mondal is passionate about improving educational standards in our panchayat.",
    email: "rajesh.mondal@dhalparapanchayat.gov.in",
  },
  {
    name: "Sunita Das",
    position: "Sanchalak, Health Committee",
    bio: "Sunita Das, with her background in public health, leads initiatives to improve healthcare access for all residents.",
    email: "sunita.das@dhalparapanchayat.gov.in",
  },
  {
    name: "Kamal Ghosh",
    position: "Sanchalak, Agriculture Committee",
    bio: "Kamal Ghosh brings years of farming experience to his role, focusing on sustainable agricultural practices.",
    email: "kamal.ghosh@dhalparapanchayat.gov.in",
  },
];

export const VISION_MISSION = {
  vision:
    "To transform Dhalpara into a model village with sustainable development, preserving our cultural heritage while embracing modern advancements.",
  mission:
    "Our mission is to ensure inclusive growth, provide quality education, improve healthcare facilities, promote sustainable agriculture, and empower all sections of our community.",
};

export const ACHIEVEMENTS = [
  "100% household electrification achieved in 2019",
  "Implemented rainwater harvesting in 80% of public buildings",
  "Established a solar-powered community center in 2021",
  "Achieved 95% literacy rate among youth aged 15-24",
  "Successfully implemented waste segregation and recycling program",
];

// Existing constants remain unchanged

// Existing constants remain unchanged

export const TENDER_DATA = {
  currentTenders: [
    {
      id: "CT001",
      title: "Construction of Community Hall",
      deadline: "2024-03-15",
      budget: "₹50,00,000",
    },
    {
      id: "CT002",
      title: "Solar Panel Installation for Panchayat Office",
      deadline: "2024-03-20",
      budget: "₹15,00,000",
    },
    {
      id: "CT003",
      title: "Renovation of Primary Health Center",
      deadline: "2024-03-25",
      budget: "₹30,00,000",
    },
  ],
  pastTenders: [
    {
      id: "PT001",
      title: "Road Repair and Maintenance",
      completionDate: "2023-12-10",
      awardedTo: "XYZ Construction Co.",
    },
    {
      id: "PT002",
      title: "Installation of Water Purification System",
      completionDate: "2023-11-15",
      awardedTo: "ABC Water Solutions",
    },
    {
      id: "PT003",
      title: "Waste Management System Upgrade",
      completionDate: "2023-10-20",
      awardedTo: "Green Earth Recycling",
    },
  ],
  howToApply: [
    "Register on the e-procurement portal",
    "Download the tender document",
    "Prepare all required documents",
    "Submit the bid online before the deadline",
    "Attend the bid opening if required",
  ],
  guidelines: [
    "All bids must be submitted electronically",
    "Bidders must have a valid Digital Signature Certificate (DSC)",
    "Incomplete or late submissions will not be considered",
    "The Gram Panchayat reserves the right to cancel or modify any tender without assigning any reason",
    "All disputes are subject to the jurisdiction of local courts",
  ],
};

export const RESOURCES_DATA = {
  forms: [
    {
      name: "Birth Registration Form",
      downloadLink: "/forms/birth-registration.pdf",
    },
    {
      name: "Death Registration Form",
      downloadLink: "/forms/death-registration.pdf",
    },
    {
      name: "Marriage Registration Form",
      downloadLink: "/forms/marriage-registration.pdf",
    },
    {
      name: "Property Tax Assessment Form",
      downloadLink: "/forms/property-tax.pdf",
    },
  ],
  actsRules: [
    {
      name: "West Bengal Panchayat Act, 1973",
      downloadLink: "/acts/wb-panchayat-act-1973.pdf",
    },
    {
      name: "Rural Employment Guarantee Act",
      downloadLink: "/acts/rural-employment-guarantee-act.pdf",
    },
    {
      name: "Right to Information Act, 2005",
      downloadLink: "/acts/rti-act-2005.pdf",
    },
    {
      name: "Gram Panchayat Development Plan Guidelines",
      downloadLink: "/rules/gpdp-guidelines.pdf",
    },
  ],
  reports: [
    {
      name: "Annual Report 2023",
      downloadLink: "/reports/annual-report-2023.pdf",
    },
    {
      name: "Budget Utilization Report 2023",
      downloadLink: "/reports/budget-utilization-2023.pdf",
    },
    {
      name: "Social Audit Report 2023",
      downloadLink: "/reports/social-audit-2023.pdf",
    },
    {
      name: "MGNREGA Progress Report",
      downloadLink: "/reports/mgnrega-progress-2023.pdf",
    },
  ],
  faqs: [
    {
      question: "How can I obtain a birth certificate?",
      answer:
        "You can apply for a birth certificate online through our e-governance portal or visit the Panchayat office with required documents.",
    },
    {
      question: "What is the process for paying property tax?",
      answer:
        "Property tax can be paid online through our website or at the Panchayat office. Ensure you have your property ID and previous year's tax receipt.",
    },
    {
      question: "How do I register a complaint?",
      answer:
        "You can register a complaint through our online Grievance Redressal system or visit the Panchayat office to submit a written complaint.",
    },
    {
      question: "What are the office hours of the Gram Panchayat?",
      answer:
        "The Gram Panchayat office is open from Monday to Friday, 10:00 AM to 5:00 PM, except on public holidays.",
    },
  ],
};

export const domain_url = "https://www.dhalparagp.in";

export const villageData = [
  {
    jlNo: "07",
    name: "Dabra",
    households: 275,
    totalPopulation: 1187,
    malePopulation: 592,
    femalePopulation: 595,
    totalLiterate: 740,
    maleLiterate: 406,
    femaleLiterate: 334,
    scPopulation: 543,
    stPopulation: 172,
    illiteratePopulation: 447,
    childPopulation: 131,
  },
  {
    jlNo: "08",
    name: "Iswarpara",
    households: 346,
    totalPopulation: 1466,
    malePopulation: 709,
    femalePopulation: 757,
    totalLiterate: 886,
    maleLiterate: 473,
    femaleLiterate: 413,
    scPopulation: 879,
    stPopulation: 356,
    illiteratePopulation: 580,
    childPopulation: 202,
  },
  {
    jlNo: "09",
    name: "Bhimpur",
    households: 2,
    totalPopulation: 8,
    malePopulation: 5,
    femalePopulation: 3,
    totalLiterate: 6,
    maleLiterate: 3,
    femaleLiterate: 3,
    scPopulation: 0,
    stPopulation: 0,
    illiteratePopulation: 2,
    childPopulation: 1,
  },
  {
    jlNo: "10",
    name: "Srirampur",
    households: 336,
    totalPopulation: 1375,
    malePopulation: 694,
    femalePopulation: 681,
    totalLiterate: 867,
    maleLiterate: 484,
    femaleLiterate: 383,
    scPopulation: 198,
    stPopulation: 490,
    illiteratePopulation: 508,
    childPopulation: 149,
  },
  {
    jlNo: "11",
    name: "Lalpur",
    households: 484,
    totalPopulation: 1972,
    malePopulation: 1012,
    femalePopulation: 960,
    totalLiterate: 1288,
    maleLiterate: 711,
    femaleLiterate: 577,
    scPopulation: 1052,
    stPopulation: 425,
    illiteratePopulation: 684,
    childPopulation: 173,
  },
  {
    jlNo: "12",
    name: "Uttar Jamalpur",
    households: 133,
    totalPopulation: 584,
    malePopulation: 301,
    femalePopulation: 283,
    totalLiterate: 350,
    maleLiterate: 201,
    femaleLiterate: 149,
    scPopulation: 35,
    stPopulation: 82,
    illiteratePopulation: 234,
    childPopulation: 72,
  },
  {
    jlNo: "13",
    name: "Srikrishnapur",
    households: 98,
    totalPopulation: 434,
    malePopulation: 217,
    femalePopulation: 217,
    totalLiterate: 251,
    maleLiterate: 142,
    femaleLiterate: 109,
    scPopulation: 344,
    stPopulation: 1,
    illiteratePopulation: 183,
    childPopulation: 49,
  },
  {
    jlNo: "14",
    name: "Purbba Gobindapur",
    households: 79,
    totalPopulation: 294,
    malePopulation: 151,
    femalePopulation: 143,
    totalLiterate: 209,
    maleLiterate: 118,
    femaleLiterate: 91,
    scPopulation: 23,
    stPopulation: 0,
    illiteratePopulation: 85,
    childPopulation: 32,
  },
  {
    jlNo: "15",
    name: "Purba Kalikapur",
    households: 167,
    totalPopulation: 690,
    malePopulation: 359,
    femalePopulation: 331,
    totalLiterate: 501,
    maleLiterate: 278,
    femaleLiterate: 223,
    scPopulation: 13,
    stPopulation: 0,
    illiteratePopulation: 189,
    childPopulation: 79,
  },
  {
    jlNo: "33",
    name: "Dhalpara",
    households: 361,
    totalPopulation: 1438,
    malePopulation: 752,
    femalePopulation: 686,
    totalLiterate: 1064,
    maleLiterate: 573,
    femaleLiterate: 491,
    scPopulation: 516,
    stPopulation: 117,
    illiteratePopulation: 374,
    childPopulation: 153,
  },
  {
    jlNo: "34",
    name: "Purbba Thakurpur",
    households: 1,
    totalPopulation: 8,
    malePopulation: 4,
    femalePopulation: 4,
    totalLiterate: 8,
    maleLiterate: 4,
    femaleLiterate: 4,
    scPopulation: 0,
    stPopulation: 0,
    illiteratePopulation: 0,
    childPopulation: 0,
  },
  {
    jlNo: "35",
    name: "Kismat Dapt",
    households: 799,
    totalPopulation: 3163,
    malePopulation: 1634,
    femalePopulation: 1529,
    totalLiterate: 2498,
    maleLiterate: 1365,
    femaleLiterate: 1133,
    scPopulation: 268,
    stPopulation: 160,
    illiteratePopulation: 665,
    childPopulation: 265,
  },
  {
    jlNo: "36",
    name: "Chakdapat",
    households: 441,
    totalPopulation: 1692,
    malePopulation: 877,
    femalePopulation: 815,
    totalLiterate: 1223,
    maleLiterate: 674,
    femaleLiterate: 549,
    scPopulation: 231,
    stPopulation: 84,
    illiteratePopulation: 469,
    childPopulation: 142,
  },
  {
    jlNo: "37",
    name: "Chapahat",
    households: 321,
    totalPopulation: 1293,
    malePopulation: 646,
    femalePopulation: 647,
    totalLiterate: 824,
    maleLiterate: 451,
    femaleLiterate: 373,
    scPopulation: 273,
    stPopulation: 299,
    illiteratePopulation: 469,
    childPopulation: 119,
  },
  {
    jlNo: "41",
    name: "Chak Mohan",
    households: 204,
    totalPopulation: 863,
    malePopulation: 449,
    femalePopulation: 414,
    totalLiterate: 594,
    maleLiterate: 339,
    femaleLiterate: 255,
    scPopulation: 412,
    stPopulation: 31,
    illiteratePopulation: 269,
    childPopulation: 81,
  },
  {
    jlNo: "42",
    name: "Basanta",
    households: 141,
    totalPopulation: 588,
    malePopulation: 302,
    femalePopulation: 286,
    totalLiterate: 417,
    maleLiterate: 235,
    femaleLiterate: 182,
    scPopulation: 125,
    stPopulation: 82,
    illiteratePopulation: 171,
    childPopulation: 55,
  },
  {
    jlNo: "43",
    name: "Muraripur",
    households: 196,
    totalPopulation: 782,
    malePopulation: 420,
    femalePopulation: 362,
    totalLiterate: 531,
    maleLiterate: 293,
    femaleLiterate: 238,
    scPopulation: 15,
    stPopulation: 113,
    illiteratePopulation: 251,
    childPopulation: 70,
  },
  {
    jlNo: "44",
    name: "Mulahat",
    households: 231,
    totalPopulation: 956,
    malePopulation: 487,
    femalePopulation: 469,
    totalLiterate: 576,
    maleLiterate: 329,
    femaleLiterate: 247,
    scPopulation: 207,
    stPopulation: 361,
    illiteratePopulation: 380,
    childPopulation: 128,
  },
  {
    jlNo: "45",
    name: "Mahishnota",
    households: 345,
    totalPopulation: 1413,
    malePopulation: 736,
    femalePopulation: 677,
    totalLiterate: 927,
    maleLiterate: 520,
    femaleLiterate: 407,
    scPopulation: 165,
    stPopulation: 133,
    illiteratePopulation: 486,
    childPopulation: 142,
  },
  {
    jlNo: "46",
    name: "Jantipur",
    households: 141,
    totalPopulation: 615,
    malePopulation: 318,
    femalePopulation: 297,
    totalLiterate: 387,
    maleLiterate: 210,
    femaleLiterate: 177,
    scPopulation: 7,
    stPopulation: 111,
    illiteratePopulation: 228,
    childPopulation: 77,
  },
  {
    jlNo: "47",
    name: "Purbba Jagannathpur",
    households: 40,
    totalPopulation: 153,
    malePopulation: 90,
    femalePopulation: 63,
    totalLiterate: 90,
    maleLiterate: 53,
    femaleLiterate: 37,
    scPopulation: 12,
    stPopulation: 85,
    illiteratePopulation: 63,
    childPopulation: 9,
  },
  {
    jlNo: "48",
    name: "Laskarpur",
    households: 324,
    totalPopulation: 1311,
    malePopulation: 702,
    femalePopulation: 609,
    totalLiterate: 929,
    maleLiterate: 511,
    femaleLiterate: 418,
    scPopulation: 18,
    stPopulation: 54,
    illiteratePopulation: 382,
    childPopulation: 144,
  },
  {
    jlNo: "58",
    name: "Sarenbari",
    households: 54,
    totalPopulation: 246,
    malePopulation: 127,
    femalePopulation: 119,
    totalLiterate: 149,
    maleLiterate: 95,
    femaleLiterate: 54,
    scPopulation: 27,
    stPopulation: 0,
    illiteratePopulation: 97,
    childPopulation: 28,
  },
];
export const tendertermcon = [
  {
    eligible: [
      "The prospective bidders shall have satisfactorily completed as a prime agency during the last 3 (Three) years prior to the date of issue of this Notice at least one work of similar nature under authority of State/Central Govt, Central/State Government undertaking/Statutory Bodies and having 60% (Sixty percent) (as per PWD and P&RD norms) of the estimated amount put to tender. Such work should be executed in the Government Sector, Zilla Parishad, Panchayat Samity, Gram Panchayat or Public Sector undertaking. Please note that Credential means Payment certificate (where NIT No., Memo. No., Fund, Name of Work, Work Order Memo. No., M.B.No., Page No., Bill amounts including necessary deductions, Voucher No.& date, PAN, GST Regn. No. etc. to be furnished clearly) which will be tagged with Work Order & Completion Certificate. A credential will not be used for more than one work i.e. multi-use of a single credential will not be allowed otherwise the tender may be treated as cancel.",

      "Photo copies of valid Pan Card, Valid 15-digit Goods and Services Tax registration Number (GSTIN) and up-to-date GST return under GST Act, 2017 must be uploaded in the appropriate folder. In case of Registered Engineering Co-Operative Societies and Registered Labour Co-Operative Societies, they are required to furnish valid Bye Law, Current Audit Report, Valid Clearance Certificate from A.R.C.S. for the year 2021-22 along with other relevant supporting documents. Authorized persons should sign the tender documents along with technical Bid documents. During scrutiny of Technical Bid/ Tender documents, if it is found that any information is incorrect, the technical bid /tender documents will be rejected without assigning any reason thereof. The Artho-O-Parikalpana Upo-samiti of DHALPARA Gram Panchayat office will have the sole discretion to decide the eligibility of the Contractor on the basis of his submitted documents and evaluation, and also reserves the right to refuse any explanation to the Contractor without assigning any reason thereof. The decision of the DHALPARA Gram Panchayat office authority will be final in this respect.",

      "Intending bidders have to submit their bid online through the e-procurement (two cover systems) portal of http://www.wbtenders.gov.in. The scanned copy of the Tender Fee/Participation charge and earnest money is to be uploaded in the appropriate folder. The hard copy of the Tender Fee/Participation charge and EMD challan is to be deposited after opening of the Technical bid to the Office of the undersigned. The necessary Earnest Money and Tender Fee/Participation charge will be deposited by the bidder electronically (as per order no. 3975-F(Y) dtd.28.07.2016 & Memorandum No.2365-F(Y) dtd. 12.04.2018 of Finance Department, Govt. of West Bengal) online through their net banking-enabled bank account, maintained at any bank. Intending bidders will get the Beneficiary details from the e-tender portal with the help of a Digital Signature Certificate and may transfer the EMD from their respective Bank as per the Beneficiary name, Account No., Amount, Beneficiary Bank name (ICICI Bank), IFSC Code, and e-Proc Ref No. Intending bidders who want to transfer EMD through NEFT/RTGS must read the instruction of the Challan generated from the E_Procurement site. Bidders are also advised to submit the EMD of their bid at least 3 working days before the submission closing date as it requires time for processing the Payment of EMD & Tender Fee/Participation charge.",

      "The L1 bidder will have to show or submit original testimonials as the case may be after the opening of the Technical Bid.",

      "Bids from joint ventures are not allowed.",

      "Where an individual person holds a digital certificate in his own name duly issued to him against the company or the firm of which he happens to be a director or partner, such an individual person shall, while uploading any tender for and on behalf of such a company or firm, invariably upload a copy of the registered power of attorney showing clear authorization in his favor, by the rest of the directors of such company or the partners of such firm, to upload such tender. The power of attorney shall have to be registered in accordance with the provisions of the Registration Act, 1908.",

      "If for any reason the lowest tender is not accepted, a necessary decision shall be made by the Artho-O-Parikalpana Upo-Samiti regarding the finalization of the tender.",

      "The authority of DHALPARA GP reserves the right of accepting or rejecting any or all the Tenders and can distribute a part or the whole of the work(s) to any or among more than one participating Tenderers without assigning any reason. The said authority will not be bound to accept the lowest tender & if found submitting above 10% less of the work value, then the tenderer must have to submit rate analysis in a proper way.",

      "Bids shall remain valid for a period not less than 120 days from the last date of submission of Financial Bid/Sealed Bid. If the bidder withdraws the bid during the period of bid validity, the earnest money as deposited will be forfeited forthwith without assigning any reason thereof.",

      "The intending bidders should know the fact that the rates in the BOQs are inclusive of all duties, taxes, royalties, cess, [including 1% L.W. Cess under W.B. Building and other Construction Workers (Regulation of Employments & Condition of Service) Act, 1996], toll taxes, and other levies payable by the Contractor under the Contract to the State / Central Government for any other cause, shall be included in the rates, prices, and total Bid price submitted by the bidder. 1% Cess under W.B. Building and other Construction Workers (Regulation of Employments & Condition of Service) Welfare Cess Act, 1996 will be deducted from the bills. No separate claim under any circumstances will be allowed.",

      "In this tender no arbitration will be allowed.",

      "No credential will be  considered unless it is supported by Payment certificate, Work Order & Completion Certificate issued by the competent authority not below the rank of  the Executive Engineer / Secretary / Executive Officer/BDO/ Pradhan of Gram Panchayat/ Chairman of Municipality as the case may be under whom the work has been executed ",

      "If any tenderer fails to produce the original hard copies or any other documents on demand of the tendering authority within a specified time frame or if any deviation is detected in the hard copies from the uploaded soft copies or if there is any suppression of fact, necessary penal action will be taken against the bidder as per rules.",

      "The Tenderers are advised to submit only required documents as prescribed in this notice. If it is found unnecessary documents submitted which has no connection related to this notice, his/her tender at Technical Bid stage may be cancelled without any intimation to him/her.",

      "No Mobilization / Secured advance will be allowed to selected agency.",

      "No advantage will be given against any typographical or arithmetical mistake.",

      "The intending bidders or any of their constituent partner shall neither have abandoned any work nor any of their contract have been rescinded during the last 03 (three) years. Such abandonment or rescission will be considered as disqualification towards eligibility. (Declaration in this respect has to be furnished by the intending bidders without which the bid will be treated as non-responsible).",

      "The bidders at their own responsibility and risk is encouraged to visit and examine the site of works and its surrounding and obtain all information that may be necessary for preparing the bid and entering into a contract for the work mentioned in the Notice. The costs of visiting the site shall be at the bidder’s own expense.",

      "Artho–O-ParikalpanaUpo-Samiti and the DHALPARAGram Panchayat authority reserves the right to reject or accept any or whole tender without assigning any reason thereof",

      " Additional performance security @ 10% of the tendered amount shall be deposited when the bid rate is 80 % i.e. 20 % or above less (As per Finance Department, Audit Branch, Memorandum No. 4608-F(Y), Dated, 18th July, 2018).",
      "The additional performance Security shall be submitted in the form of Bank Guarantee from any scheduled bank before issuance of the Work Order. If the bidder fails to submit the additional performance security within seven working days from the date of issuance of letter of acceptance, his Earnest Money will be forfeited and other necessary actions as per NIT like blacklisting of the contractor etc, may be taken. The bank Guarantee shall have to be valid up to end of the contract period and shall be renewed accordingly, if required.",
      " The Bank Guarantee shall be returned immediately on successful completion of the contract. If the bidder fails to complete the work successfully, the additional performance security shall be forfeited at any time during the pendency of the contract period after serving proper notice to the contractor. Necessary provisions regarding deduction of security deposit from the progressive bills of the contractor as per relevant clauses of the contract shall in no way be altered/affected by provision of this additional performance security.",
      "In case of power of attorney empowering the power holder (Registered) to act as agency, agreement will be done only with the original agency and such power of attorney will not be accepted without specific order of Govt.",
      "The bidders intended to enjoy exemption from depositing EMD, should submit necessary govt. orders with NOC of ARCS.  In support of such exemption from depositing EMD at the time of e-filling.",
      "Conditional rate will not be entertained.",
      "All the pages of the agreement for the work executed should be signed by the participant/ Tenderer.",

      "Work order will be issued when fund is availale for payment",
    ],
    qualidyceteria: [
      "Valid PAN issued by the IT Deptt. Govt. of India.",
      "Valid 15-digit Goods and Services Tax identification or registration Number (GSTIN) and up-to-date GST return under GST Act, 2017.",
      "Completion and payment Certificate of State/Central Govt., Central/State Government undertaking/Statutory Bodies and having 60% (Sixty percent) of the estimated amount put to tender.",
      "Work Order of the work(s), against which the Completion Certificate & Payment Certificate has been issued.",
      "Professional Tax Clearance Certificate and Upto date Challan.",
      "Valid up-to-date Trade License.",
      "Last Three financial years Income Tax Return Certificate.",
      "The scan copy of the participation charge and the Deposited challan of the EMD are to be uploaded in the appropriate folder with sign and work SI. No. should be mentioned clearly on the top of the deposited challan, as a Proof of participation charge and EMD.",
      "In case of Partnership Firm / Registered Company, the intending Tenderers are requested to submit the copy of the DEED of Partnership / the company shall furnish the Article of Association and Memorandum in support of proof or so.",
    ],
    termcondition: [
      "All the Intending Tenderers must have to visit the work site to judge the local condition from all corners and no complain about the site will be entertained afterwards. It will be presumed that the agency offered the tender rate after review of entire position of the work site.",
      "This Notice Inviting Tender will be treated as a part of the Tender Document.",
      "In case of any day, meant for this tender, appears to be an unscheduled holiday, the next working day will be treated as scheduled / prescribed day for the same purpose.",
      "Agencies shall have to arrange required land for installation of plant & machineries, storing of materials, labour shed, laboratory etc. at their own cost and responsibility nearest to the work site if needed.",
      "No preconditioned tender will be accepted.",
      "All the rates of works are inclusive of all taxes, cess, levy, octroi, royalty, transportation, loading, unloading, stacking, etc including all other incidental charges therein.",
      "Bidder(s) may be asked to submit rate analysis for items where the quoted rates are above 10% less than the estimated amount put to tender. Such bids may also be considered as null and void if there is a reason to believe that the Bidders have formed a cartel and rates have been manipulated, unbalanced or unreasonable.",
      "The Successful Tenderer, herein, will have to execute an agreement on a Non-Judicial Stamp worth Rs. 10/- only and the work has to be started within 07(Seven) days from the issue of work order without fail before the work order is issued with the Gram Panchayat wherein the description, specification, quantity, date of completion of work, other mandatory conditions and ESMF (Environmental and Social Management Framework) issues shall be detailed. Failure to execute the contract will lead to automatic cancellation of the bid.",
      "The contractor responsible for the execution of the work as per accept the “Schedule of agreed rates” (insert the quoted L1 rates as in the Tender submitted by this bidder using the Standard Format) which shall be deemed to form and be read and construed as part of the Contract.",
      "Time & Cost over-run will not be permitted. In case of any work not being completed by the contractor within the stipulated time-frame, necessary Penal measure, in the tune of deduction of an amount, as decided by the DHALPARAGram Panchayat Office, will be imposed.",
      "The Contractors are required to set well equipped laboratory for exercising effective quality control. Periodical tests on materials and works shall have to be conducted as per the relevant codes. Suitable Laboratory Assistants are to be posted in the Laboratories for the same. The results of all quality control tests and observations should be required for getting any payment. Any claim regarding payment will not be entertained without quality control test report including the certificate of Engineers concerned.",
      "The contractor shall obey the forest protection rules and not be involved in cutting of trees at the work site, shall not be involved in destruction of archaeological importance, shall not encroach any type of land, will never cause conflict among community groups, shall never be involved in construction of roads on fertile agricultural land or encroaching on water bodies.",
      "Necessary deduction towards Income Tax ,Labour Welfare Cess and GST etc. will be made as per Govt. norms, and Security Deposit of total 10% (ten percent) of the value of work will be deducted from each progressive or Final bill as the case may be. The Successful contractor shall have to submit 3 (Three) copies of application in the prescribed form for license (Form No VI) duly filled and signed by the contractor along with the tender. The license fee in terms of Rule -26(2) and the Security Deposit of Labour in terms of Rule – 24 of West Bengal Contract &Labour [Regulation & Abolition) Act. 1972 should be separately deposited to the Local Acts deposit under the contract Labour (Regulation and Abolition) Act, 1970&the contract labour (Regulation and abolition) Central Rules 1971 wherever applicable.",
      "No child labour to be used under necessary child labour acts.",
      "Sub-allotment of work under any circumstances will not be permitted.",
      "Payment of Final bill/R.A bill of above mentioned work will be made after satisfactory verification of the total claim with reference to all related records and papers as per availability of fund &The Work done will be inspected and measured as per P & RD D/West Bengal PWD norms by the Nirman Sahayak /E.I.C and admissible payment will be determined on the basis of the schedule of agreed rates. No claim for delay in payment of bill will be entertained. At the time of payment of each bill deduction will be made as per present norms of Govt. of West Bengal.",
      "Incomplete, defective, erroneous/unsigned tender will be rejected without comparison.",
      "No consumable materials will be supplied to the agency for work from the office of the undersigned. Agency will be responsible for procuring all materials required for proper execution of work at his own cost.",
      "In case of sinking of tube well, testing of water quality by authorized Govt. organisation is to be done by the contractor, before taking up the work. Test report is to be submitted to the Gram Panchayat before the work is started or completed as the case may be.",
      "The contractor will be responsible for proper adherence to all legal and statutory provisions relating to execution of the work.",
      "All the works to be executed according to drawing and specification approved by the authority and the direction of the Nirman Sahayak / Engineer-in-Charge is to be strictly followed.",
      "Before start of work the cutting of bushes, cleaning jungles etc for which no extra payment will be entertained.",
      "The successful/L1 bidder will claim his EMD after completion of liability period on his own letter head pad as a prayer along with work order and e-generating challan from Govt. of West Bengal, e-procurement GRIPS eChallan.",
      "Time is the essence of contract. The successful contractor must complete the work within the time Specified for completion. The permitted enlargement, extension, reduction, omissions, alterations or additions resulting out a formal duly signed amendment to the contract will not affect the validity or any other conditions of the contract except for those conditions that are explicitly specified in the formal duly signed amendment to the contract. If any contractor fails to complete the work within the stipulated time the work order issued in his favour will be cancelled without assigning any reason thereof. The undersigned may also proceed to get the balance work completed by any other means including through other contractors. The excess expenditure, if any, due to such a step would be recoverable from the unpaid bills/security deposit of the tenderer. This is apart from any other measure the undersigned may take, including blacklisting of the contractors or forfeited of earnest money or both of them.",
      "The concerned Nirman Sahayak/E.I.C nominated by the employer / PIA shall be entitled to make any alterations to the design, character, position, quantities, dimensions or method of execution thereof, and to order for any extra or additional works to be done, the contractor will not be entitled to any compensation for any reduction or omission, but will be eligible for payments only for the actual amount of work done and for the approved material furnished against a specific item in the schedule of work as per the specified rates.",
      "In the event of any of the provisions of the contract requiring amendment, the amendments shall be made in writing and shall be signed by the Pradhan, DHALPARA Gram Panchayat and the Contractor and no work as result of any amendment shall proceed without mutually agreed and signed amendment to that effect. Any verbal contracts / understandings relating to abandoning, modifying, extending, reducing or supplementing any part(s) of the contracted work will not be executed until they are incorporated as a formal duly signed amendment to the contract.",
      "Acceptance of the lowest tender is not obligatory and the undersigned reserves the right to accept or reject any or all the tenders without assigning any reason whatsoever and also to split up the tendered work to more than one contractor in the interest of better scheme execution.",
      "The contractor will be responsible for any damages, accidents, mishaps, thefts at the work site during execution of the work and liabilities arising there from or any loss of materials, time monetary of pertaining to any life has to be entirely accounted as per norms by the Executing Farm / Agencies / Contractor.",
      "On account of any delay of the work, as per mention schedule time mention in the notice, penalty has to be paid by the agency / contractor/ reputed firms. The amount of penalty under consideration as per order norms.",
      "The final bill/Payment will be done as per work done measurement after availability of fund.",
      "The contractor will entirely be responsible for rectification of any defects during this period. The security deposit retained as per west Bengal Govt. Norms will be returned within 10 days of the successful expiry of the defect liability period.",
    ],
  },
];

export const workorderforward = [
  "The Executive Assistant, Dhalpara GP",
  "The Nirman Sahayak, Dhalpara GP",
  "The Secretary, Dhalpara GP",
  "The Member, Concerned Sansad, Dhalpara GP",
  "The Sanchalak, Shilpa-O- Parikathamo Upa Samity,Dhalpara GP",
  "The Sanchalak, Siksha-O- Janasasthya Upa Samity,Dhalpara GP",
  "Office Notice Board",
];

export const supplytermand = [
  "Delivery Timeline: Complete the supply within 7 (Seven) days from the date of this order (i.e., by 31-08-2024).",

  "Material Specifications: Strictly adhere to the quality, quantity, and specifications mentioned in the NIT and tender documents.",

  "Documentation: Submit the following during delivery:",

  "2 copies of delivery challan (1 for billing, 1 for stock entry).",

  "2 sets of color photographs of materials supplied.",

  "Authority Compliance: All decisions of No. 3 Dhalpara Gram Panchayat regarding the supply shall be final and binding.",
];
