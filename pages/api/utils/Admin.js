const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

class Admin {
  static async checkAuthentication(email, password){
      let records = await base('Admin').select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", "password"]
      }).firstPage();
      if (records.length === 0) {console.log("email does not exist"); return false;}
      else{
        return records[0].get("email") === email && records[0].get("password") === password;
      }
  }
}
module.exports = Admin;