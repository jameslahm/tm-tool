/**@jsx jsx */
import React, { useCallback, useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import api from '../utils';
import { useParams } from '@reach/router';
import { colors } from '../assets/colors';
import { FormLabel, FormInput, FormSelect } from './Form';
import { Button } from './Button';

interface EditTemplatePropsType {
  path: string;
}

const EditTemplate: React.FC<EditTemplatePropsType> = () => {
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    const {
      name: nameElement,
      url: urlElement,
      type: typeElement,
    } = (document.querySelector('form') as any).elements;
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
    return (
      <h2
        css={css`
          text-align: center;
        `}
      >
        Loading......
      </h2>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5rem auto;
      `}
    >
      <form
        css={css`
          padding: 2rem 3rem;
          border: 1px solid #000;
          border-radius: 1rem;
          background-color: ${colors.surface};
          color: ${colors.textOnSurface};
          max-width: 500px;
          width: 100%;
        `}
        onSubmit={handleSubmit}
      >
        <FormLabel htmlFor="name">Template Name</FormLabel>
        <FormInput type="text" id="name" defaultValue={templateInfo.name} />

        <FormLabel htmlFor="url">Template Url</FormLabel>
        <FormInput type="text" id="url" defaultValue={templateInfo.url} />

        <FormLabel htmlFor="type">Template Type</FormLabel>
        <FormSelect
          name="type 
        "
          id="type"
          defaultValue={templateInfo.type}
        >
          <option value="local">Local</option>
          <option value="remote">Remote</option>
        </FormSelect>

        {isSuccess ? (
          <p
            css={css`
              margin-bottom: 0rem;
              margin-left: 0.1rem;
            `}
          >
            Success!
          </p>
        ) : null}

        <Button
          size="middle"
          css={css`
            margin-top: 0.7rem;
          `}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditTemplate;
