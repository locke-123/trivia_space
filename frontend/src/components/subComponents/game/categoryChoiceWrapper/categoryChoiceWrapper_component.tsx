import { Container, CategoryCard } from "./categoryChoiceWrapper_presenter";

interface categoryDataProps {
    categoryData : {
        flag: boolean;
        data: string[];
    }
}

export default function CategoryChoiceWrapperComponent({ categoryData }: categoryDataProps){

    return (
        <Container>
            <CategoryCard>일반 지식</CategoryCard>
            <CategoryCard>영화</CategoryCard>
            <CategoryCard>과학</CategoryCard>
            <CategoryCard>컴퓨터 과학</CategoryCard>
            <CategoryCard>일본 애니 & 만화</CategoryCard>
        </Container>
    )
}