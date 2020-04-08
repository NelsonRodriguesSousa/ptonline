import { fire} from './Fire'

export default class FirebaseService {

  // logout
  static logout = () => {
    fire.auth().signOut();
  }

}
