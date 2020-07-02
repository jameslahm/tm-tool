/**@jsx jsx */
import Card from './Card';
import { jsx, css } from '@emotion/core';

interface CardGridProp {
  items: { name: string; url: string; type: string }[];
  update: React.Dispatch<React.SetStateAction<number>>;
}

const CardGrid: React.FC<CardGridProp> = ({ items, update }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-gap: 2rem 2rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      `}
    >
      {items.map((item) => {
        return <Card {...item} key={item.name} update={update}></Card>;
      })}
    </div>
  );
};

export default CardGrid;
