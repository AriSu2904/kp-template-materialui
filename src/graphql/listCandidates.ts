import { gql } from '@apollo/client';

export const QUERY_LIST_CANDIDATES = gql`
    query candidates {
      listCandidates {
        firstName,
          lastName,
          nickName,
          email,
          nik,
          phone,
          dob,
          address,
          batch,
          status,
          skills,
          experience,
          technicalScore {
          basicTest
          mathTest
          codingTest
        },
        forecastResult {
          codingScoreWeighted,
            skillExperience,
            basicAndMathScoreWeighted
        }
      }
    }`