import express from "express";
import db from "@repo/db/client";

const app = express();
const WEB_HOOK_PORT = 7010;
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  // check if this request actually came from hdfc bank, use a webhook secret here
  const paymentInformation: {
    token: string,
    userId: string,
    amount: string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  };

  // Update balance in db, add txn

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount)
          }
        }
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success"
        }
      })
    ]);
    
    res.status(200).json({
      message: "Captured"
    })
    
  } catch (e) {
    console.log("ERROR when processing webhook: ", e);
    res.status(411).json({
      message: "Error while processing webhook"
    })
  }

});


app.listen(WEB_HOOK_PORT, ()=> {
  console.log(`webhook listening on ${WEB_HOOK_PORT}`);
});