let visitors;
class Visitor {
	static async injectDB(conn) {
		visitors = await conn.db("Assignment").collection("visitors")
	}

    //register visitor
    static async registerVisitor(username,phoneNum,parking) {
        return visitors.findOne({        
        
         'name': username,    
         }).then(async user =>{
        if (user) {
         if ( user.parking == parking )
         {
          return "parking not available"
         }
        }
        else
        {
      
         await visitors.insertOne({      
          "name" : username,
          "phone number": phoneNum,
          "parking": parking
         })
         return "new visitors registered"
        }
         }) 
        }

        //update visitor parking
        static async updateVisitor(username, parking) {
            const exist= await visitors.findOne({username: username})
             if(exist){
               const data= await visitors.updateOne(
                 {username : username},
                 {"$set":
                { "parking":parking}
                } //update
                 )
                 return exist
             }
             else{
               return "Visitor is not exist"
                }
             
             }

        //delete
        static async delete(username) {
            const exist= await visitors.findOne({username: username})
            if(exist){
            const data= await visitors.deleteOne(
                {username : username}
                )
                return exist
            }
            else{
            return "Visitor is not exist"
                }
        }
    }

    module.exports = Visitor;