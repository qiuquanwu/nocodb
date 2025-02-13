import fs from 'fs';
import path from 'path';

import mkdirp from 'mkdirp';

import { IStorageAdapterV2, XcFile } from 'nc-plugin';
import NcConfigFactory from '../../../../utils/NcConfigFactory';

import request from 'request';

export default class Local implements IStorageAdapterV2 {
  constructor() {}

  public async fileCreate(key: string, file: XcFile): Promise<any> {
    const destPath = path.join(NcConfigFactory.getToolDir(), ...key.split('/'));
    try {
      mkdirp.sync(path.dirname(destPath));
      const data = await fs.readFileSync(file.path);
      await fs.writeFileSync(destPath, data);
      fs.unlinkSync(file.path);
      // await fs.promises.rename(file.path, destPath);
    } catch (e) {
      throw e;
    }
  }

  async fileCreateByUrl(key: string, url: string): Promise<any> {
    const destPath = path.join(NcConfigFactory.getToolDir(), ...key.split('/'));
    return new Promise((resolve, reject) => {
      mkdirp.sync(path.dirname(destPath));
      const file = fs.createWriteStream(destPath);
      const sendReq = request.get(url);

      // verify response code
      sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
          return reject('Response status was ' + response.statusCode);
        }

        sendReq.pipe(file);
      });

      // close() is async, call cb after close completes
      file.on('finish', () => {
        file.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(null);
        });
      });

      // check for request errors
      sendReq.on('error', (err) => {
        fs.unlink(destPath, () => reject(err.message)); // delete the (partial) file and then return the error
      });

      file.on('error', (err) => {
        // Handle errors
        fs.unlink(destPath, () => reject(err.message)); // delete the (partial) file and then return the error
      });
    });
  }

  // todo: implement
  fileDelete(_path: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  public async fileRead(filePath: string): Promise<any> {
    try {
      const fileData = await fs.promises.readFile(
        path.join(NcConfigFactory.getToolDir(), ...filePath.split('/'))
      );
      return fileData;
    } catch (e) {
      throw e;
    }
  }

  init(): Promise<any> {
    return Promise.resolve(undefined);
  }

  test(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
