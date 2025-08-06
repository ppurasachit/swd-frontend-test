'use client';

import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { ArrowLeftOutlined, ArrowUpOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'trapezoid' | 'parallelogram' | 'oval' | 'rectangle' | 'rightTriangle';
  row: number;
  position: number;
}

const StylePage: React.FC = () => {
  const router = useRouter();
  const { t, ready } = useTranslation();
  
  // State for shapes - ตามรูปแรกเป๊ะๆ
  const [shapes, setShapes] = useState<Shape[]>([
    // Row 0 (top row) - 3 shapes: oval, trapezoid, rectangle
    { id: 1, type: 'oval', row: 0, position: 0 },
    { id: 2, type: 'trapezoid', row: 0, position: 1 },
    { id: 3, type: 'rectangle', row: 0, position: 2 },
    
    // Row 1 (bottom row) - 3 shapes: parallelogram, square, circle
    { id: 4, type: 'parallelogram', row: 1, position: 0 },
    { id: 5, type: 'square', row: 1, position: 1 },
    { id: 6, type: 'circle', row: 1, position: 2 },
  ]);

  const handleGoBack = () => {
    router.push('/');
  };

  // Move left - shift all shapes left across all positions (can cross rows)
  const handleMoveLeft = () => {
    setShapes(prevShapes => {
      // Sort all shapes by row then position to get linear order
      const sortedShapes = [...prevShapes].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.position - b.position;
      });
      
      // Shift left: move first item to last position
      const firstShape = sortedShapes.shift();
      if (firstShape) {
        sortedShapes.push(firstShape);
      }
      
      // Reassign positions
      return sortedShapes.map((shape, index) => ({
        ...shape,
        row: index < 3 ? 0 : 1,
        position: index < 3 ? index : index - 3
      }));
    });
  };

  // Move right - shift all shapes right across all positions (can cross rows)
  const handleMoveRight = () => {
    setShapes(prevShapes => {
      // Sort all shapes by row then position to get linear order
      const sortedShapes = [...prevShapes].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.position - b.position;
      });
      
      // Shift right: move last item to first position
      const lastShape = sortedShapes.pop();
      if (lastShape) {
        sortedShapes.unshift(lastShape);
      }
      
      // Reassign positions
      return sortedShapes.map((shape, index) => ({
        ...shape,
        row: index < 3 ? 0 : 1,
        position: index < 3 ? index : index - 3
      }));
    });
  };

  // Switch rows - swap shapes between row 0 and row 1
  const handleSwitchRows = () => {
    setShapes(prevShapes => {
      return prevShapes.map(shape => ({
        ...shape,
        row: shape.row === 0 ? 1 : 0
      }));
    });
  };

  // Random position for shape when clicked
  const handleShapeClick = () => {
    setShapes(prevShapes => {
      const newShapes = [...prevShapes];
      
      // Shuffle array
      for (let i = newShapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newShapes[i], newShapes[j]] = [newShapes[j], newShapes[i]];
      }
      
      // Reassign positions maintaining row structure (3 shapes per row)
      return newShapes.map((shape, index) => {
        const row = index < 3 ? 0 : 1;
        const position = index < 3 ? index : index - 3;
        
        return {
          ...shape,
          row,
          position
        };
      });
    });
  };

  // Wait for translations to be ready
  if (!ready) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>;
  }

  const getShapeContent = (type: Shape['type']) => {
    switch (type) {
      case 'circle':
        return <div className={`${styles.shape} ${styles.circle}`} />;
      case 'square':
        return <div className={`${styles.shape} ${styles.square}`} />;
      case 'triangle':
        return <div className={`${styles.shape} ${styles.triangle}`} />;
      case 'rightTriangle':
        return <div className={`${styles.shape} ${styles.rightTriangle}`} />;
      case 'trapezoid':
        return <div className={`${styles.shape} ${styles.trapezoid}`} />;
      case 'parallelogram':
        return <div className={`${styles.shape} ${styles.parallelogram}`} />;
      case 'oval':
        return <div className={`${styles.shape} ${styles.oval}`} />;
      case 'rectangle':
        return <div className={`${styles.shape} ${styles.rectangle}`} />;
      default:
        return <div className={`${styles.shape} ${styles.circle}`} />;
    }
  };

  // Group shapes by row and sort by position
  const getShapesByRow = (row: number) => {
    return shapes
      .filter(shape => shape.row === row)
      .sort((a, b) => a.position - b.position);
  };

  return (
    <div className={styles.stylePage}>
      <div className={styles.headerSection}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleGoBack}
          type="primary"
          className={styles.backButton}
        >
          {t('style.backToHome')}
        </Button>
        <h1 className={styles.pageTitle}>{t('style.title')}</h1>
      </div>

      <div className={styles.controlsSection}>
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={handleMoveLeft}
              className={`${styles.controlButton} ${styles.moveLeft}`}
              icon={<ArrowLeftOutlined />}
            >
              ไปซ้าย
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={handleSwitchRows}
              className={`${styles.controlButton} ${styles.switchRows}`}
              icon={<ArrowUpOutlined />}
            >
              สลับขึ้นลง
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={handleMoveRight}
              className={`${styles.controlButton} ${styles.moveRight}`}
              icon={<ArrowRightOutlined />}
            >
              ไปขวา
            </Button>
          </Col>
        </Row>
      </div>

      <div className={styles.shapesContainer}>
        <Row gutter={[24, 24]} justify="center" className={`${styles.shapesRow} ${styles.topRow}`}>
          {getShapesByRow(0).map((shape) => (
            <Col 
              key={shape.id}
              className={styles.shapeCol}
            >
              <Card 
                className={styles.shapeCard}
                hoverable
                onClick={() => handleShapeClick()}
                cover={
                  <div className={styles.shapeContainer}>
                    {getShapeContent(shape.type)}
                  </div>
                }
              />
            </Col>
          ))}
        </Row>
        <Row gutter={[24, 24]} justify="start" className={`${styles.shapesRow} ${styles.bottomRow}`}>
          {getShapesByRow(1).map((shape) => (
            <Col 
              key={shape.id}
              className={styles.shapeCol}
            >
              <Card 
                className={styles.shapeCard}
                hoverable
                onClick={() => handleShapeClick()}
                cover={
                  <div className={styles.shapeContainer}>
                    {getShapeContent(shape.type)}
                  </div>
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default StylePage;