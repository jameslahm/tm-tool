/**@jsx jsx */
import { useState, useEffect } from '/web_modules/react.js';
import { jsx, css } from '/web_modules/@emotion/core.js';
import api from '../utils/index.js';
import { useParams } from '/web_modules/@reach/router.js';
import { colors } from '../assets/colors/index.js';
import { FormLabel, FormInput, FormSelect } from './Form.js';
import { Button } from './Button.js';

const EditTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [templateInfo, setTemplateInfo] = useState({
    name: '',
    url: '',
    type: '',
  });
  const params = useParams();
  useEffect(() => {
    if (params.template) {
      setLoading(true);
      api
        .get(`/templates/${params.template}`)
        .then((res) => {
          setTemplateInfo({
            name: params.template,
            url: res.data.url,
            type: res.data.type,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault(); // @ts-ignore

    const {
      name: nameElement,
      url: urlElement,
      type: typeElement,
    } = document.querySelector('form').elements;
    api
      .post(`/templates`, {
        url: urlElement.value,
        type: typeElement.value,
        name: nameElement.value,
      })
      .then(({ data }) => {
        setTemplateInfo({
          url: data.url,
          type: data.type,
          name: data.name,
        });
        setLoading(false);
        setIsSuccess(true);
      });
    setLoading(true);
  }

  if (loading) {
    return jsx(
      'h2',
      {
        css: css`
          text-align: center;
        `,
      },
      'Loading......',
    );
  }

  return jsx(
    'div',
    {
      css: css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5rem auto;
      `,
    },
    jsx(
      'form',
      {
        css: css`
          padding: 2rem 3rem;
          border: 1px solid #000;
          border-radius: 1rem;
          background-color: ${colors.surface};
          color: ${colors.textOnSurface};
          max-width: 500px;
          width: 100%;
        `,
        onSubmit: handleSubmit,
      },
      jsx(
        FormLabel,
        {
          htmlFor: 'name',
        },
        'Template Name',
      ),
      jsx(FormInput, {
        type: 'text',
        id: 'name',
        defaultValue: templateInfo.name,
      }),
      jsx(
        FormLabel,
        {
          htmlFor: 'url',
        },
        'Template Url',
      ),
      jsx(FormInput, {
        type: 'text',
        id: 'url',
        defaultValue: templateInfo.url,
      }),
      jsx(
        FormLabel,
        {
          htmlFor: 'type',
        },
        'Template Type',
      ),
      jsx(
        FormSelect,
        {
          name: 'type  ',
          id: 'type',
          defaultValue: templateInfo.type,
        },
        jsx(
          'option',
          {
            value: 'local',
          },
          'Local',
        ),
        jsx(
          'option',
          {
            value: 'remote',
          },
          'Remote',
        ),
      ),
      isSuccess
        ? jsx(
            'p',
            {
              css: css`
                margin-bottom: 0rem;
                margin-left: 0.1rem;
              `,
            },
            'Success!',
          )
        : null,
      jsx(
        Button,
        {
          size: 'middle',
          css: css`
            margin-top: 0.7rem;
          `,
          type: 'submit',
        },
        'Submit',
      ),
    ),
  );
};

export default EditTemplate;
