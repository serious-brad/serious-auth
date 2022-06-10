import {v4} from "uuid"
import path from "path"

class FileService {
  saveFile(file) {
    if (!file) {
      return null;
    }

    try {
      const fileName = v4() + ".jpg";
      const filePath = path.resolve('static', fileName);

      file.mv(filePath);

      return fileName;
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
