import React, { useState } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Container, Image, Segment } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';

const MLBStatsAPI = require('@asbeane/mlb-stats-api');
const mlbStats = new MLBStatsAPI();

const ShowPosts = () => {
  const [response, setPosts] = useState({});
  async function useResponse() {
    try {
      const response = await mlbStats.getPerson({
        pathParams: { personId: 493316 },
      });
      setPosts(response.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  useResponse();

  return (
    <div className="container">
      {response.people?.map((item, i) => {
        return <p key={i}>Full Name - {item.fullName}</p>;
      })}
      {response.people?.map((item, i) => {
        return <p key={i}>Birthdate - {item.birthDate}</p>;
      })}
      {response.people?.map((item, i) => {
        return <p key={i}>Weight - {item.weight}</p>;
      })}
      {response.people?.map((item, i) => {
        return <p key={i}>height - {item.height}</p>;
      })}
    </div>
  );
};

const PlayerCardView = (props) => {
  const { content } = props;
  return (
    <Container>
      <div id="page-document">
        <Helmet title={content.title} />
        <h1 className="documentFirstHeading">{content.title}</h1>
        <Segment clearing>
          <ShowPosts />
          <hr />
          Everything above this line is auto-generated.
          <Image
            src={flattenToAppURL(content.image?.scales?.preview?.download)}
            size="small"
            floated="right"
            alt={content.image_caption}
            avatar
          />
          <p>Positions: {content.positions}</p>
          <p>Current Team: {content.currentteam}</p>
          <div dangerouslySetInnerHTML={{ __html: content.blurb.data }} />
        </Segment>
      </div>
    </Container>
  );
};

export default PlayerCardView;
