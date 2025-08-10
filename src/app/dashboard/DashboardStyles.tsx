import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff, #e0e7ff);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 1.2;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.75rem 0;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin: 0;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

export const IconBadge = styled.div<{ color?: string }>`
  background: ${({ color }) => color || '#e0e7ff'};
  color: ${({ color }) => (color ? '#000' : '#4f46e5')};
  padding: 0.5rem;
  border-radius: 9999px;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const SectionSub = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBlock = styled.div``;

export const InfoLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const InfoValue = styled.p`
  font-size: 1.125rem;
  color: #111827;
  margin: 0;
`;

export const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickCard = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  padding: 1.5rem;
  transition: box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 16px 35px rgba(0,0,0,0.12);
  }
`;

export const QuickHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const QuickTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const QuickText = styled.p`
  color: #4b5563;
  margin: 0 0 1rem 0;
`;

export const LinkButton = styled.button`
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  padding: 0;
  cursor: pointer;
  &:hover { color: #1d4ed8; }
`;

export const RecentHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1.5rem 0;
`;

export const RecentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RecentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
`;

export const RecentIcon = styled.div`
  background: #dbeafe;
  color: #2563eb;
  border-radius: 9999px;
  padding: 0.5rem;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const RecentBody = styled.div`
  flex: 1;
`;

export const RecentTitle = styled.p`
  margin: 0;
  font-weight: 600;
  color: #111827;
`;

export const RecentSub = styled.p`
  margin: 0.125rem 0 0 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const RecentTime = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

