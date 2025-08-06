'use client';

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const { Option } = Select;

const languages = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'th', label: 'ไทย', flag: '🇹🇭' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // รอให้ component mount เสร็จก่อน
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  // แสดง loading state ก่อน mount เสร็จ
  if (!mounted) {
    return (
      <div className="language-switcher">
        <Select
          value="en"
          className="language-select"
          suffixIcon={<GlobalOutlined />}
          disabled
          style={{ minWidth: 120 }}
        >
          <Option value="en">
            <span className="language-option">
              <span className="flag">🇺🇸</span>
              <span className="label">English</span>
            </span>
          </Option>
        </Select>
      </div>
    );
  }

  return (
    <div className="language-switcher">
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="language-select"
        suffixIcon={<GlobalOutlined />}
        popupClassName="language-dropdown" // เปลี่ยนจาก classNames
      >
        {languages.map((lang) => (
          <Option key={lang.value} value={lang.value}>
            <span className="language-option">
              <span className="flag">{lang.flag}</span>
              <span className="label">{lang.label}</span>
            </span>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSwitcher;