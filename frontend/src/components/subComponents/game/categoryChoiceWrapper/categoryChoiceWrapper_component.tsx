import { Container, CategoryCard } from "./categoryChoiceWrapper_presenter";
import type { categoryDataProps } from "../gameComponentTypes";

export default function CategoryChoiceWrapperComponent({ categoryData }: categoryDataProps){

    return (
        <Container>
            {categoryData.flag ? categoryData.data.map((el, key) => {
                return <CategoryCard key={key}>{el}</CategoryCard>
            }) : ''}
        </Container>
    )
}