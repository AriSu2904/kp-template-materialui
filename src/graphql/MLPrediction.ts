import { gql } from '@apollo/client';

export const SINGLE_PREDICTION = gql`
  mutation predict ($nik: String!){
    predictCandidate(nik: $nik) {
      nik,
      batch,
      status,
      forecastResult {
         codingScoreWeighted,
         skillExperience,
         basicAndMathScoreWeighted
      }
    }
  }`