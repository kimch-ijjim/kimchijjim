import React, { useState } from 'react';
import './app.css';

function Project_1() {
  // 1. 파티클 목록을 저장할 state (메모리 공간)
  const [particles, setParticles] = useState([]);

  // 2. 마우스가 움직일 때마다 실행될 함수
  const handleMouseMove = (event) => {
    // 마우스 좌표 가져오기
    const { clientX, clientY } = event;

    // 파티클 데이터 객체 생성 (고유 id, 좌표, 색상 등)
    const newParticle = {
      id: Date.now(),
      x: clientX,
      y: clientY,
      hue: Math.random() * 360, // 0~360 사이의 무작위 색상 값
    };

    // 3. state 업데이트: 기존 목록에 새 파티클 추가
    // slice(-30)를 이용해 파티클 개수를 최대 30개로 유지합니다.
    setParticles(prev => [...prev, newParticle].slice(-100));
  };

  return (
    // 4. 마우스 움직임을 감지할 전체 화면 div
    <div className="App" onMouseMove={handleMouseMove}>
      {/* 5. state에 저장된 파티클 배열을 화면에 렌더링 */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: `hsl(${particle.hue}, 90%, 70%)`,
          }}
        />
      ))}
    </div>
  );
}

export default Project_1;