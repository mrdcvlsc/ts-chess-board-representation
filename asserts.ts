type operator_equal_t = string | number | boolean | Date;

export class Asserts {
  public results: boolean[];
  public resname: string[];
  public msg: string[];

  constructor() {
    this.results = [];
    this.resname = [];
    this.msg = [];
  }

  public assert_eq(name: string, A: operator_equal_t, B: operator_equal_t) {
    this.resname.push(name);
    this.results.push(A === B);
  }

  public assert_neq(name: string, A: operator_equal_t, B: operator_equal_t) {
    this.resname.push(name);
    this.results.push(A !== B);
  }

  public assert_regex_eq(name: string, A: RegExp, B: RegExp) {
    this.resname.push(name);
    this.results.push(A.toString() === B.toString());
  }

  public assert_regex_neq(name: string, A: RegExp, B: RegExp) {
    this.resname.push(name);
    this.results.push(A.toString() !== B.toString());
  }

  public assert_array_eq(name: string, result: any[], expected: any[]): void {
    this.resname.push(name);

    if (result.length !== expected.length) {
      this.results.push(false);
      return;
    }

    for (let i = 0; i < result.length; ++i) {
      if (result[i] !== expected[i]) {
        this.results.push(false);
        return;
      }
    }

    this.results.push(true);
  }

  public assert_array_neq(name: string, result: any[], expected: any[]): void {
    this.resname.push(name);

    if (result.length !== expected.length) {
      this.results.push(true);
      return;
    }

    for (let i = 0; i < result.length; ++i) {
      if (result[i] !== expected[i]) {
        this.results.push(true);
        return;
      }
    }

    this.results.push(false);
  }

  // public assert_sobj_eq(name: string, result: object, expected: object): void {
  //   this.resname.push(name);
  //   this.results.push(result === expected);
  // }

  // public assert_sobj_neq(name: string, result: object, expected: object): void {
  //   this.resname.push(name);
  //   this.results.push(result === expected);
  // }

  public assert_true(name: string, entity: any) {
    this.resname.push(name);
    if (entity) {
      this.results.push(true);
    } else {
      this.results.push(false);
    }
  }

  public assert_false(name: string, entity: any) {
    this.resname.push(name);
    if (entity) {
      this.results.push(false);
    } else {
      this.results.push(true);
    }
  }

  public verdict() {
    console.log();
    console.log('-----------------------------------------------');
    console.log('| Result | name                               |');
    console.log('| ------ | ---------------------------------- |');
    let final_result = true;
    for (let i = 0; i < this.results.length; ++i) {
      if (!this.results[i]) {
        final_result = false;
      }
      console.log(
        `| ${(this.results[i]) ? 'PASSED' : 'FAILED'} | ${this.resname[i]} |`
      );
    }
    console.log('-----------------------------------------------');
    console.log(`TEST : ${(final_result) ? 'PASSED' : 'FAILED'}`)
    if (final_result === false) {
      throw new Error("Verdict : FAILED - some tests failed");
    }
  }
}
