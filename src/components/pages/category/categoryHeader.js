import { useParams } from "react-router-dom";

import './categoryHeader.css';

export function CategoryHeader() {
    let params = useParams();

    return (
        <section className="category-header">
            <h2>{params.page}</h2>
        </section>
    )
}