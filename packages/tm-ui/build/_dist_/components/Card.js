/**@jsx jsx */
import React, { useState } from '/web_modules/react.js';
import { jsx, css } from '/web_modules/@emotion/core.js';
import { colors } from '../assets/colors/index.js';
import { Icon } from '../assets/icons/index.js';
import { navigate } from '/web_modules/@reach/router.js';
import { CircleButton } from './Button.js';
import { Dialog } from '/web_modules/@reach/dialog.js';
import '../assets/css/dialog.css.proxy.js';
import { Button } from './Button.js';
import { FormInput, FormLabel } from './Form.js';
import api from '../utils/index.js';
const CircleButtonEmojiCss = `background-color: ${colors.surface};
font-family: Segoe UI Emoji;
font-size: 1.8rem;
&:hover {
  background: ${colors.surface};
}
&:active {
  background: ${colors.surface};
}`;

const Card = ({ name, url, type, update }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleCreate(event) {
    const projectName = document.getElementById('projectName').value;
    api
      .post(`/templates/${name}`, {
        projectName: projectName,
      })
      .then(() => {
        setIsSuccess(true);
      });
  }

  function handleDelete(event) {
    api.delete(`/templates/${name}`).then((res) => {
      update((x) => x + 1);
    });
  }

  return jsx(
    React.Fragment,
    null,
    jsx(
      Dialog,
      {
        css: css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `,
        isOpen: isCreating,
        onDismiss: () => setIsCreating(false),
      },
      jsx(
        'div',
        {
          css: css`
            display: flex;
            justify-content: flex-end;
            width: 100%;
          `,
        },
        jsx(
          Button,
          {
            onClick: () => setIsCreating(false),
            css: css`
              background-color: ${colors.surface};
              border: none;
              outline: none;
              border-radius: 50%;
              padding-left: 0.8rem;
              padding-right: 0.8rem;
            `,
          },
          jsx(Icon, {
            name: 'times',
          }),
        ),
      ),
      jsx(
        'div',
        {
          css: css`
            max-width: '500px';
            width: 100%;
          `,
        },
        jsx(FormLabel, null, 'Project Name'),
        jsx(FormInput, {
          id: 'projectName',
        }),
        isSuccess ? jsx('p', null, 'Success!') : null,
        jsx(
          'div',
          {
            css: css`
              display: flex;
              justify-content: space-between;
              margin-top: 1rem;
            `,
          },
          jsx(
            Button,
            {
              onClick: handleCreate,
            },
            'Create',
          ),
          jsx(
            Button,
            {
              onClick: () => setIsCreating(false),
            },
            'Cancel',
          ),
        ),
      ),
    ),
    jsx(
      'div',
      {
        css: css`
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border: 1px solid #000;
          border-radius: 1rem;
          background-color: ${colors.surface};
          color: ${colors.textOnSurface};
        `,
        'aria-label': 'Card',
      },
      jsx(
        'div',
        {
          css: css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 0.8rem;
          `,
        },
        jsx(
          'p',
          {
            css: css`
              margin: 0;
            `,
          },
          'NAME: ',
          name,
        ),
        type === 'local'
          ? jsx(Icon, {
              name: 'home',
              color: colors.primary,
            })
          : jsx(Icon, {
              name: 'server',
              color: colors.primary,
            }),
      ),
      jsx('hr', {
        css: css`
          width: 100%;
        `,
      }),
      jsx(
        'div',
        {
          css: css`
            text-align: center;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          `,
        },
        jsx(
          'p',
          {
            css: css`
              margin: auto;
              max-width: 80%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `,
          },
          'URL: ',
          url,
        ),
      ),
      jsx(
        'div',
        {
          css: css`
            display: flex;
            justify-content: space-around;
            margin-bottom: 0.8rem;
          `,
        },
        jsx(
          CircleButton,
          {
            css: css`
              ${CircleButtonEmojiCss}
            `,
            onClick: () => {
              setIsCreating(true);
            },
          },
          '\uD83D\uDEE0',
        ),
        jsx(
          CircleButton,
          {
            css: css`
              ${CircleButtonEmojiCss}
            `,
            onClick: () => {
              navigate(`/${name}`);
            },
          },
          '\u270F\uFE0F',
        ),
        jsx(
          CircleButton,
          {
            css: css`
              ${CircleButtonEmojiCss}
            `,
            onClick: handleDelete,
          },
          '\u274C',
        ),
      ),
    ),
  );
};

export default Card;
