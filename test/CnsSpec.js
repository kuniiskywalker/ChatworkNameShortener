import assert from 'power-assert'
import Cns from '../src/Cns';

describe('Cns', () => {

    context('If the destination is a one', () => {
        it('does nothing conversion', () => {
            var data = '[To:123456] テスト太郎さん';
            assert(Cns.deleteName(data) === "[To:123456] テスト太郎さん");
        });
    });

    context('If the destination is 2 or more', () => {
        it('delete the line break and name', () => {
            var data = '[To:111111] テスト太郎さん' + "\r\n" + '[To:222222] テスト太郎さん' + "\r\n";
            assert(Cns.deleteName(data) === '[To:111111][To:222222]' + "\n");
        });
    });

    context('If name is deleted', () => {
        it('not delete name', () => {
            var data = '[To:111111][To:222222]' + "\r\n";
            assert(Cns.isDeleted(data) === true);
        });

        it('not delete name', () => {
            var data = '[To:111111][To:222222]' + "\r\n" +  + '[To:222222] テスト太郎さん' + "\r\n";
            assert(Cns.isDeleted(data) === true);
        });
    });
});