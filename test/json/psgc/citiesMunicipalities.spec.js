import { expect } from 'chai';

const citiesMuns = require('../../../src/json/psgc/citiesMunicipalities.json');

export default () => {
  describe('citiesMunicipalities.json', () => {
    it('should have 1634 cities/municipalities', () => {
      expect(citiesMuns.length).to.eql(1634);
    });

    // Check a few provinces to see if data is correct
    it('should have correct data', () => {
      // Check a city/municipality that has no altName
      const cavite = citiesMuns.find((r) => (r.name === 'Cavite City'));

      expect(cavite).to.deep.eql({
        code: '042105000',
        name: 'Cavite City',
        fullName: 'City of Cavite',
        altName: null,
        province: '042100000',
        classification: 'CITY',
        isCapital: false,
      });

      //--

      // Check a city/municipality that has an altName
      const joseAbadSantos = citiesMuns.find((r) => (r.name === 'Jose Abad Santos'));

      expect(joseAbadSantos).to.deep.eql({
        code: '118602000',
        name: 'Jose Abad Santos',
        fullName: 'Jose Abad Santos (Trinidad)',
        altName: 'Trinidad',
        province: '118600000',
        classification: 'MUNICIPALITY',
        isCapital: false,
      });
    });

    it('should have Metro Manila cities/municipalities', () => {
      const quezonCity = citiesMuns.find((r) => (r.name === 'Quezon City'));

      expect(quezonCity).to.deep.eql({
        code: '137404000',
        name: 'Quezon City',
        fullName: 'Quezon City',
        altName: null,
        province: '130100000',
        classification: 'CITY',
        isCapital: false,
      });

      //--

      const lasPinasCity = citiesMuns.find((r) => (r.name === 'Las Piñas City'));

      expect(lasPinasCity).to.deep.eql({
        code: '137601000',
        name: 'Las Piñas City',
        fullName: 'City of Las Piñas',
        altName: null,
        province: '130100000',
        classification: 'CITY',
        isCapital: false,
      });
    });

    // Check if alt name was processed correctly
    it('should have no parenthesis in names', () => {
      citiesMuns.forEach((cityMun) => {
        const parenthesis = /[()]/g;

        expect(cityMun.name.search(parenthesis)).to.be.eql(-1, `"${cityMun.name}" has a parenthesis`);

        if (cityMun.altName) {
          expect(cityMun.altName.search(parenthesis)).to.be.eql(-1, `"${cityMun.altName}" has a parenthesis`);
        }
      });
    });

    // Check if alt name was processed correctly
    it('should render "ñ" correctly', () => {
      const cityMun = citiesMuns.find((r) => (r.name === 'Sergio Osmeña Sr'));

      expect(cityMun.name).to.eql('Sergio Osmeña Sr');
      expect(cityMun.fullName).to.eql('Sergio Osmeña Sr');
    });

    describe('city/municipality', () => {
      let cityMun;

      before(() => {
        [cityMun] = citiesMuns;
      });

      it('should have a field "code"', () => {
        expect(cityMun).to.haveOwnProperty('code');
      });

      it('should have a field "name"', () => {
        expect(cityMun).to.haveOwnProperty('name');
      });

      it('should have a field "fullName"', () => {
        expect(cityMun).to.haveOwnProperty('fullName');
      });

      it('should have a field "altName"', () => {
        expect(cityMun).to.haveOwnProperty('altName');
      });

      it('should have a non-empty field "province"', () => {
        citiesMuns.forEach((c) => {
          expect(c).to.haveOwnProperty('province');
          expect(c.province).to.not.be.empty(`${c.name} does not have a province`);
        });
      });

      it('should have a field "classification"', () => {
        expect(cityMun).to.haveOwnProperty('classification');
      });

      it('should have a field "isCapital"', () => {
        expect(cityMun).to.haveOwnProperty('isCapital');
      });
    });
  });
};