import { theme } from "@/styles/theme";
import styled from "styled-components";

interface MealsCardProps {
    title: string;
    content: string[];
    cal?: string;
}

export const MealsCard = ({ title, content, cal }: MealsCardProps) => {
    return (
        <Container>
            <LeftWrap>
                <Title>{title}</Title>
                {cal && <Cal>{cal}</Cal>}
            </LeftWrap>
            <MealsContainer>
                {content.length === 1 || content.length === 0 ? (
                    <MealContent>급식 정보가 없습니다</MealContent>
                ) : (
                    content.map((item) => <MealContent>{item}</MealContent>)
                )}
            </MealsContainer>
        </Container>
    )
}

const LeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:16px;
`

const MealsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    margin:24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    border: 1px solid ${theme.color.main[50]};
    border-radius: 8px;
    width:90%;
`

const Cal = styled.div`
    text-align: center;
    background-color: ${theme.color.main[500]};
    color: white;
    border-radius: 12px;
    padding: 4px 12px;
    font-size: ${theme.font.label[2].size};
`

const Title = styled.p`
    font-size: ${theme.font.subTitle[1].size};
    color: ${theme.color.main[700]};
`

const MealContent = styled.div`
    font-size: ${theme.font.button[1].size};
    color: black;
`