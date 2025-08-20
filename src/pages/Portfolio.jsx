import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. useNavigate 훅 가져오기

// 2. 포트폴리오 데이터를 배열로 관리 (나중에 DB나 API에서 가져올 수 있음)
const projectData = [
  {
    id: "project-1",
    title: "interactive artwork exercise-1",
    summary: "AI를 활용한 추천 시스템 개발",
  },
  // {
  //   id: "project-2",
  //   title: "두 번째 프로젝트",
  //   summary: "React 기반 반응형 웹사이트 구축",
  // },
  // {
  //   id: "project-3",
  //   title: "세 번째 프로젝트",
  //   summary: "데이터 시각화 대시보드 제작",
  // },
];

const Section = styled(motion.section)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  background: #f7f9ff;
  padding: 8rem 2rem; /* 상단 여백을 넉넉하게 추가 */
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -3px;
  margin-bottom: 3.5rem; /* 타이틀과 목록 사이 여백 추가 */
`;

const ProjectList = styled.div`
  width: 90vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ProjectItem = styled(motion.div)`
  background: #fff;
  border-radius: 1rem; /* 조금 더 각진 느낌으로 변경 */
  padding: 2.3rem 2.5rem;
  font-family: 'Manrope', 'Inter', sans-serif;
  color: #232323;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* 제목과 요약 사이의 간격 */
  cursor: pointer;

  /* 모던한 디자인을 위한 테두리와 전환 효과 */
  border: 1px solid #e9e9fd;
  box-shadow: 0 4px 18px -8px #5c5cff1c;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.025) translateY(-5px); /* Framer Motion과 겹치지 않게 CSS transform은 주석 처리하거나 Framer Motion으로 통일 */
    border-color: #9393ff;
    box-shadow: 0 10px 25px -8px #5c5cff33;
  }

  /* 박스 내부 텍스트 스타일 */
  b {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  span {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
  }
`;

function Portfolio() {
  // 4. navigate 함수 초기화
  const navigate = useNavigate();

  // 5. 프로젝트 아이템 클릭 시 실행될 함수
  const handleProjectClick = (projectId) => {
    // projectId를 이용해 동적 URL 경로로 이동
    navigate(`/portfolio/${projectId}`);
  };

  return (
    <Section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
    >
      <Title>Portfolio</Title>
      <ProjectList>
        {/* 6. projectData 배열을 map으로 순회하며 ProjectItem 렌더링 */}
        {projectData.map((project, index) => (
          <ProjectItem
            key={project.id}
            whileHover={{ scale: 1.025, y: -3 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            // 7. 클릭 시 handleProjectClick 함수 실행
            onClick={() => handleProjectClick(project.id)}
          >
            <b>#{index + 1} {project.title}</b>
            {/* <span>{project.summary}</span> */}
          </ProjectItem>
        ))}
      </ProjectList>
    </Section>
  );
}

export default Portfolio;