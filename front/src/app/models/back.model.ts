export class Back{
    static authUrl : string = 'http://localhost:3127/user' ;   
    static loginUrl : string = 'http://localhost:3127/auth' ;
    static projectUrl : string = 'http://localhost:3127/project' ;  
    static commentUrl :string = 'http://localhost:3127/comment' ; 
    static commandUrl :string='http://localhost:3127/command';
    static likeUrl :string='http://localhost:3127/like';

    
    static config = {
        noAuthHeader : {
            "Content-Type" :"application/json;charset=utf-8"
        },
        authHeader : {
            "Content-Type":"application/json;charset=utf-8" ,
            "Authorization":""
        }
    }
}