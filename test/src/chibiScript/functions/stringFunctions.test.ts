import { expect } from 'chai';
import { $c, ChibiJson } from '../../../../src/chibiScript/ChibiGenerator';
import { ChibiConsumer } from '../../../../src/chibiScript/ChibiConsumer';

describe('String Functions', () => {
  describe('split', () => {
    it('should split string by delimiter', () => {
      const code = $c.string('a,b,c').split(',').run();
      expect(generateAndExecute(code).run()).to.deep.equal(['a', 'b', 'c']);
    });

    it('should handle empty string', () => {
      const code = $c.string('').split(',').run();
      expect(generateAndExecute(code).run()).to.deep.equal(['']);
    });
  });

  describe('join', () => {
    it('should join array with separator', () => {
      const code = $c.array(['a', 'b', 'c']).join('-').run();
      expect(generateAndExecute(code).run()).to.equal('a-b-c');
    });
  });

  describe('replace', () => {
    it('should replace first occurrence in string', () => {
      const code = $c.string('apple apple').replace('apple', 'orange').run();
      expect(generateAndExecute(code).run()).to.equal('orange apple');
    });

    it('should handle no matches', () => {
      const code = $c.string('apple').replace('banana', 'orange').run();
      expect(generateAndExecute(code).run()).to.equal('apple');
    });
  });

  describe('replaceAll', () => {
    it('should replace all occurrences in string', () => {
      const code = $c.string('apple apple').replaceAll('apple', 'orange').run();
      expect(generateAndExecute(code).run()).to.equal('orange orange');
    });
  });

  describe('substring', () => {
    it('should extract substring with start and end indexes', () => {
      const code = $c.string('hello world').substring(0, 5).run();
      expect(generateAndExecute(code).run()).to.equal('hello');
    });

    it('should extract substring with only start index', () => {
      const code = $c.string('hello world').substring(6).run();
      expect(generateAndExecute(code).run()).to.equal('world');
    });
  });

  describe('regex', () => {
    it('should extract matched group', () => {
      const code = $c.string('hello123world').regex('o(\\d+)', 0).run();
      expect(generateAndExecute(code).run()).to.equal('o123');
    });

    it('should extract capture group', () => {
      const code = $c.string('hello123world').regex('o(\\d+)', 1).run();
      expect(generateAndExecute(code).run()).to.equal('123');
    });

    it('should throw error for no match', () => {
      const code = $c.string('helloworld').regex('\\d+', 0).run();
      expect(() => generateAndExecute(code).run()).to.throw(/No match found/);
    });

    it('should be case-insensitive by default', () => {
      const code = $c.string('HELLO123').regex('hello(\\d+)', 1).run();
      expect(generateAndExecute(code).run()).to.equal('123');
    });

    it('should respect provided flags', () => {
      const code = $c.string('HELLO123').regex('hello(\\d+)', 1, '').run();
      expect(() => generateAndExecute(code).run()).to.throw(/No match found/);
    });

    it('should use multiple flags', () => {
      const code = $c.string('HELLO\n123').regex('hello(.*)', 1, 'is').run();
      expect(generateAndExecute(code).run()).to.equal('\n123');
    });
  });

  describe('toLowerCase', () => {
    it('should convert to lowercase', () => {
      const code = $c.string('Hello World').toLowerCase().run();
      expect(generateAndExecute(code).run()).to.equal('hello world');
    });
  });

  describe('toUpperCase', () => {
    it('should convert to uppercase', () => {
      const code = $c.string('Hello World').toUpperCase().run();
      expect(generateAndExecute(code).run()).to.equal('HELLO WORLD');
    });
  });

  describe('trim', () => {
    it('should trim whitespace', () => {
      const code = $c.string('  hello  ').trim().run();
      expect(generateAndExecute(code).run()).to.equal('hello');
    });
  });

  describe('includes', () => {
    it('should return true when string includes substring', () => {
      const code = $c.string('hello world').includes('world').run();
      expect(generateAndExecute(code).run()).to.be.true;
    });

    it('should return false when string does not include substring', () => {
      const code = $c.string('hello world').includes('banana').run();
      expect(generateAndExecute(code).run()).to.be.false;
    });
  });
});

function generateAndExecute(input: ChibiJson<any>) {
  const json = JSON.stringify(input);
  const script = JSON.parse(json);
  const consumer = new ChibiConsumer(script);

  return consumer;
}
