// src/app/page.tsx
'use client';

import React from 'react';
import { Card, Row, Col } from 'antd';
import { BgColorsOutlined, FormOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import './home.scss';

const { Meta } = Card;

const HomePage: React.FC = () => {
  const router = useRouter();
  const { t, ready } = useTranslation();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // Wait for translations to be ready
  if (!ready) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1 className="main-title">{t('home.title')}</h1>
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            className="test-card"
            cover={
              <div className="card-icon">
                <BgColorsOutlined />
              </div>
            }
            onClick={() => handleNavigate('/style')}
          >
            <Meta 
              title={t('home.test1.title')} 
              description={t('home.test1.description')} 
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            className="test-card"
            cover={
              <div className="card-icon">
                <FormOutlined />
              </div>
            }
            onClick={() => handleNavigate('/form')}
          >
            <Meta 
              title={t('home.test2.title')} 
              description={t('home.test2.description')} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;