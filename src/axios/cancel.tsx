export class Cancel {
  message: string;
  constructor(value: string) {
    this.message = value;
  }
}

export function isCancel(error: any) {
  return error instanceof Cancel;
}

export class CancelToken {
  public resolve: any;
  source() {
    return {
      token: new Promise((resolve) => {
        this.resolve = resolve;
      }),
      cancel: (message: string) => {
        this.resolve(new Cancel(message));
      },
    };
  }
}
