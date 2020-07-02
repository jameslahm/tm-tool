/**@jsx jsx */
import { useState, useEffect } from '/web_modules/react.js';
import { css, jsx } from '/web_modules/@emotion/core.js';
import { CircleButton } from './Button.js';
import { Icon } from '../assets/icons/index.js';
import api from '../utils/index.js';
import GridCard from './CardGrid.js';
import { navigate } from '/web_modules/@reach/router.js';

const Home = () => {
  const [isStale, setIsStale] = useState(0);
  const [templates, setTemplates] = useState({});
  useEffect(() => {
    api
      .get('/templates')
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isStale]);
  return jsx(
    'div',
    {
      css: css`
        max-width: 1280px;
        width: 100%;
        padding: 2rem 3rem;
        margin: auto;
      `,
    },
    jsx(GridCard, {
      items: Object.keys(templates).map((key) => {
        return {
          name: key,
          url: templates[key].url,
          type: templates[key].type,
        };
      }),
      update: setIsStale,
    }),
    jsx(
      CircleButton,
      {
        css: css`
          position: fixed;
          right: 5rem;
          bottom: 5rem;
        `,
        onClick: () => {
          navigate('/add');
        },
      },
      jsx(Icon, {
        name: 'plus',
      }),
    ),
  );
};

export default Home;
