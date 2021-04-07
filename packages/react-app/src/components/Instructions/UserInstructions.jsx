import React from "react";
import { Card, Typography } from "antd";

export const UserInstructions = () => {
  return (
    <Card bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Typography.Title level={2}>👨‍🏫 How to use this demo</Typography.Title>
      <Typography.Title level={3}>⚙ Configure Mumbai testnet on Metamask</Typography.Title>
      <Typography.Text>
        This demo is deployed on the Mumbai testnet. Follow{" "}
        <a href="https://docs.matic.network/docs/develop/metamask/testnet/">these instructions</a> to add the Mumbai
        testnet to your Metamask config.{" "}
      </Typography.Text>
      <Typography.Title level={3}>🤑 Fund your wallet!</Typography.Title>
      <Typography.Text>
        Go to the <a href="https://faucet.matic.network/">faucet</a> and send yourself some testnet MATIC.
      </Typography.Text>
      <Typography.Text>
        The smart contract is already funded with testnet LINK to pay for the image moderation work.
      </Typography.Text>
      <Typography.Title level={3}>🔗 Connect Metamask to app</Typography.Title>
      <Typography.Text>
        Press the 'Connect' button in the top-right corner to connect Metamask to this app.
      </Typography.Text>
      <Typography.Title level={3}>
        You should now be able to upload and submit an image to appear in the gallery! 🥳
      </Typography.Title>
      <Typography.Text>Moderation labels will be calculated for your image upon submission.</Typography.Text>
      <Typography.Text>
        If flagged, your image will be blurred by default with a summary of the moderation labels to give other users
        prior warning before they view it.
      </Typography.Text>
      <Typography.Text>
        This prototype of TrueSight only requests moderation labels from Amazon Rekognition. For documentation on the
        supported label categories please see the{" "}
        <a href="https://docs.aws.amazon.com/rekognition/latest/dg/moderation.html">Amazon Rekognition docs</a>.
      </Typography.Text>
      <Typography.Text>
        <b>
          Please feel free to upload images which are likely to trigger generation of moderation labels but please
          nothing illegal!
        </b>
      </Typography.Text>
      <Typography.Text>
        <b>
          Images of a person making a middle finger gesture are a pretty sure and innocent way to trigger a moderation label 😁🖕
        </b>
      </Typography.Text>
    </Card>
  );
};
