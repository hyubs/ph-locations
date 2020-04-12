import fs from 'fs';
import sinon from 'sinon';
import { expect } from 'chai';
import writeJsonFile from '../../../src/utils/writeJsonFile';

export default () => {
  describe('writeJsonFile', () => {
    let writeFileStub;
    const filePath = './foo.json';
    const data = { foo: 'bar' };

    beforeEach(() => {
      writeFileStub = sinon.stub(fs, 'writeFile');
    });

    afterEach(() => {
      sinon.restore();
    })

    it('should write to file path', () => {
      writeJsonFile(filePath, data);

      expect(writeFileStub).to.have.been.called();
      expect(writeFileStub.args[0][0]).to.be.equal('./foo.json');
    });

    it('should JSON.stringify() the data', () => {
      const stringifySpy = sinon.spy(JSON, 'stringify');

      writeJsonFile(filePath, data);

      expect(stringifySpy).to.have.been.called();
      expect(writeFileStub.args[0][1]).to.be.equal(JSON.stringify(data, null, 2));
    });

    it('should use utf-8 encoding', () => {
      writeJsonFile(filePath, data);

      expect(writeFileStub).to.have.been.called();
      expect(writeFileStub.args[0][2]).to.deep.equal({ encoding: 'utf-8' });
    });
  });
};
