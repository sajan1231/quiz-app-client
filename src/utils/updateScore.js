export default async function updateScore(url, jwt, score) {
  console.log(score, 'update score helper...');

  let res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt
    },
    body: JSON.stringify({
      // score: score
      scores: score
    })
  })

  let jsonData = await res.json();
  if (jsonData.success) return jsonData;
  else return null;
};

export const incUsersTotalScore = async (url, jwt) => {
  let res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt
    }
  })

  let jsonData = await res.json();
  if (jsonData.success) return jsonData;
  else return null;
};