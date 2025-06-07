import { gql } from '@apollo/client';

export default gql`
  mutation LoginRequest($nik: String!, $token: String!) {
    loginToken(nik: $nik, token: $token) {
      nik
      token
    }
  }`;