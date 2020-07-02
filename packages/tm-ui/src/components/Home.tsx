/**@jsx jsx */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import type { TemplateMapType } from '@tm-tools/tm-shared';
import { CircleButton } from './Button';
import { Icon } from '../assets/icons';
import api from '../utils';
import GridCard from './CardGrid';
import { navigate } from '@reach/router';

interface HomePropsType {
  path: string;
}

const Home: React.FC<HomePropsType> = () => {
  const [isStale, setIsStale] = useState(0);
  const [templates, setTemplates] = useState<TemplateMapType>({});
  useEffect(() => {
    api
      .get<TemplateMapType>('/templates')
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isStale]);

  return (
    <div
      css={css`
        max-width: 1280px;
        width: 100%;
        padding: 2rem 3rem;
        margin: auto;
      `}
    >
      <GridCard
        items={Object.keys(templates).map((key) => {
          return {
            name: key,
            url: templates[key].url,
            type: templates[key].type,
          };
        })}
        update={setIsStale}
      ></GridCard>
      <CircleButton
        css={css`
          position: fixed;
          right: 5rem;
          bottom: 5rem;
        `}
        onClick={() => {
          navigate('/add');
        }}
      >
        <Icon name="plus"></Icon>
      </CircleButton>
    </div>
  );
};

export default Home;
