/**@jsx jsx */
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import { colors } from '../assets/colors';
import { Icon } from '../assets/icons';
import { navigate } from '@reach/router';
import { CircleButton } from './Button';
import { Dialog } from '@reach/dialog';
import '../assets/css/dialog.css';
import { Button } from './Button';
import { FormInput, FormLabel } from './Form';
import api from '../utils';

interface CardProps {
  name: string;
  url: string;
  type: string;
  update: React.Dispatch<React.SetStateAction<number>>;
}

const CircleButtonEmojiCss = `background-color: ${colors.surface};
font-family: Segoe UI Emoji;
font-size: 1.8rem;
&:hover {
  background: ${colors.surface};
}
&:active {
  background: ${colors.surface};
}`;

const Card: React.FC<CardProps> = ({ name, url, type, update }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleCreate(event: React.FormEvent) {
    const projectName = (document.getElementById(
      'projectName',
    ) as HTMLInputElement).value;
    api
      .post(`/templates/${name}`, {
        projectName: projectName,
      })
      .then(() => {
        setIsSuccess(true);
      });
  }

  function handleDelete(event: React.FormEvent) {
    api.delete(`/templates/${name}`).then((res) => {
      update((x) => x + 1);
    });
  }

  return (
    <React.Fragment>
      <Dialog
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
        isOpen={isCreating}
        onDismiss={() => setIsCreating(false)}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            width: 100%;
          `}
        >
          <Button
            onClick={() => setIsCreating(false)}
            css={css`
              background-color: ${colors.surface};
              border: none;
              outline: none;
              border-radius: 50%;
              padding-left: 0.8rem;
              padding-right: 0.8rem;
            `}
          >
            <Icon name="times"></Icon>
          </Button>
        </div>
        <div
          css={css`
            max-width: '500px';
            width: 100%;
          `}
        >
          <FormLabel>Project Name</FormLabel>
          <FormInput id="projectName"></FormInput>
          {isSuccess ? <p>Success!</p> : null}
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-top: 1rem;
            `}
          >
            <Button onClick={handleCreate}>Create</Button>
            <Button onClick={() => setIsCreating(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border: 1px solid #000;
          border-radius: 1rem;
          background-color: ${colors.surface};
          color: ${colors.textOnSurface};
        `}
        aria-label="Card"
      >
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 0.8rem;
          `}
        >
          <p
            css={css`
              margin: 0;
            `}
          >
            NAME: {name}
          </p>
          {type === 'local' ? (
            <Icon name="home" color={colors.primary}></Icon>
          ) : (
            <Icon name="server" color={colors.primary}></Icon>
          )}
        </div>
        <hr
          css={css`
            width: 100%;
          `}
        ></hr>
        <div
          css={css`
            text-align: center;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          `}
        >
          <p
            css={css`
              margin: auto;
              max-width: 80%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            URL: {url}
          </p>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            margin-bottom: 0.8rem;
          `}
        >
          <CircleButton
            css={css`
              ${CircleButtonEmojiCss}
            `}
            onClick={() => {
              setIsCreating(true);
            }}
          >
            🛠
          </CircleButton>
          <CircleButton
            css={css`
              ${CircleButtonEmojiCss}
            `}
            onClick={() => {
              navigate(`/${name}`);
            }}
          >
            ✏️
          </CircleButton>
          <CircleButton
            css={css`
              ${CircleButtonEmojiCss}
            `}
            onClick={handleDelete}
          >
            ❌
          </CircleButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
