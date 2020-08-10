export interface TransactionModel {
    hash: string;
    success: boolean;
    from: string;
    to: string;
    value: number;
    status: boolean;
    time: number;
}