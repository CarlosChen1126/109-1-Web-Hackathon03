import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  try{
    const data=await Question.find();
    res.status(200).send({messages:'success', contents:data})
  }catch(err){
    res.status(403).send({messages:'error', contents:[]})
    console.log(err)

  }
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
    
  try{
      const ans=req.body.answer
      const data=await Answer.find()
      let score=0;
      for(let i=0;i<parseInt(ans.length);i++){
        const [x]=await Answer.find({questionID:i+1});
        if(x.answer===ans[i]){
          score+=1;
        }
      }
      res.status(200).send({messages:'success', score:score})
    }catch(err){
      res.status(403).send({messages:'error', score:-1})
    }
    
    


}
