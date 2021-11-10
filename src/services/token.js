import Web3 from "web3";
import { client } from "../apollo/client";
import { DO_LOGIN, VALIDATE_TOKEN } from "../apollo/gql/auth";
import Logger from "../Logger";

export async function validateAuthToken(token) {
  try {
    const { data } = await client.mutate({
      mutation: VALIDATE_TOKEN,
      variables: {
        token,
      },
    });

    return data.validateToken;
  } catch (error) {
    console.error("Error in token login", error);
    Logger.captureException(error);
  }
}

export async function getToken(user, signedMessage, networkId) {
  if (signedMessage && user) {
    try {
      console.log({ user });
      const { data } = await client.mutate({
        mutation: DO_LOGIN,
        variables: {
          walletAddress: Web3.utils.toChecksumAddress(user.walletAddress),
          signature: signedMessage,
          email: user.email,
          avatar: user.avatar,
          name: user.name,
          hostname: window.location.hostname,
          networkId,
        },
      });

      return data?.loginWallet?.token;
    } catch (error) {
      console.log("Error in token login", error);
      Logger.captureException(error);
    }
  }
}
