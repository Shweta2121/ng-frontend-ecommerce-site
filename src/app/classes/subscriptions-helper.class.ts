import { Subscription } from 'rxjs';

export class SubscriptionHelper {

    private _subMap: { [key: string]: Subscription; } = {};

    /**
     * Get a Subscription with `key`
     * @param {String} key
     * @returns {Subscription}
     */
    getSubscription(key: string): Subscription {
        return this._subMap[key];
    }

    /**
     * Store the instanse of a Subscription with `key` and `Subscription instance`
     * @param {String} key
     * @param {Subscription} subscription
     * @returns {void}
     */
    subscribe(key: string, subscription: Subscription): void {
        if (this._subMap[key]) {
            this._subMap[key].unsubscribe();
        }
        this._subMap[key] = subscription;
    }

    /**
     * Unsubscribe a Subscription with `key`
     * @param {String} key
     * @returns {void}
     */
    unsubscribe(key: string): void {
        if (this._subMap[key]) {
            this._subMap[key].unsubscribe();
            delete this._subMap[key];
        }
    }

    /**
     * Unsubscribe all the exsisting Subscriptions
     * @returns {void}
     */
    unsubscribeAll(): void {
        for (const key of Object.keys(this._subMap)) {
            if (this._subMap[key]) {
                this._subMap[key].unsubscribe();
            }
        }
    }
}