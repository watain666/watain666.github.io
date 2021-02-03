# POJ font test


```PHP

<?php


namespace App\Task;

use Hyperf\Amqp\Producer;
use Hyperf\DB\DB;
use Hyperf\Utils\ApplicationContext;
use Psr\EventDispatcher\EventDispatcherInterface;
use ssc9\cst\GameType;
use ssc9\evt\NewDrawEvent;
use ssc9\model\GameConfigModel;
use ssc9\mq\MqMessage;
use ssc9\mq\RoutingKey;
use ssc9\util\GameUtils;

class CheckDrawsTask
{
    public static function execute()
    {
        $container = ApplicationContext::getContainer();
        try {
            foreach (GameType::$key2id as $game_type) {
                if (empty(GameType::$g_cls[$game_type]) || $game_type == GameType::SIX) continue;

                $game = GameType::$g_cls[$game_type];
                $curr_draw = $game::create_draw();
                $info = $game::get_draw_time($curr_draw); //当期
                $gTable = $container->get('dtables');
                $old_draw = $gTable->get("$game_type", 'open');//保存在内存的上一期
                if ($curr_draw > $old_draw) {
                    $info->left_time = $info->close_time - time();
                    $gTable->set("$game_type",
                        [
                            'open' => $curr_draw,
                            'open_time' => $info->open_time,
                            'close_time' => $info->close_time
                        ]);
                    self::build_draw($game_type, $curr_draw, $info);
                    GameConfigModel::query()->where('id', '=', $game_type)->update(
                        [
                            'curr_draw' => $curr_draw,
                            'close_time' => $info->end_time
                        ]);
                    $event = new NewDrawEvent($game_type, $old_draw, $curr_draw, $info);
                    $container->get(EventDispatcherInterface::class)->dispatch($event);
                    $container->get(Producer::class)->produce(new MqMessage($event, RoutingKey::draw_new));
                }
            }
        } catch (\Exception $e) {
            echo $e->getMessage() . $e->getTraceAsString();
        }
    }

    private static function build_draw($game_type, $draw, $info)
    {
        $sql = sprintf("insert ignore into ssc_draw_info (id,date,game_type,game_id,start_time,end_time,open_time,close_time,info) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            GameUtils::make_game_key($game_type, $draw), $info->date, $game_type, $draw, $info->start_time, $info->end_time, $info->open_time, $info->close_time, 0);
        DB::execute($sql);
    }
}

```

2: ́ 3: ̀ 5: ̂ 7: ̄ 8: ̍ 9: ̆

Å å

A Á À Â Ā A̍ Ă a á à â ā a̍ ă

A͘ Á͘ À͘ Â͘ Ā͘ A̍͘ Ă͘ a͘ á͘ à͘ â͘ ā͘ a̍͘ ă͘

D Ḏ ḏ

Đ đ

E É È Ê Ē E̍ Ĕ e é è ê ē e̍ ĕ

E͘ É͘ È͘ Ê͘ Ē͘ E̍͘ Ĕ͘ e͘ é͘ è͘ ê͘ ē͘ e̍͘ ĕ͘

Ï ï

I Í Ì Î Ī I̍ Ĭ i í ì î ī i̍ ĭ

I͘ Í͘ Ì͘ Î͘ Ī͘ I̍͘ Ĭ͘ i͘ í͘ ì͘ î͘ ī͘ i̍͘ ĭ͘

L Ḻ ḻ


M Ḿ M̀ M̂ M̄ M̍ M̆ m ḿ m̀ m̂ m̄ m̍ m̆

N Ń Ǹ N̂ N̄ N̍ N̆ n ń ǹ n̂ n̄ n̍ n̆

ⁿ

O Ó Ò Ô Ō O̍ Ŏ o ó ò ô ō o̍ ŏ

O͘ Ó͘ Ò͘ Ô͘ Ō͘ O̍͘ Ŏ͘ o͘ ó͘ ò͘ ô͘ ō͘ o̍͘ ŏ͘

Ö Ö́ Ö̀ Ö̂ Ȫ Ö̍ Ö̆ ö ö́ ö̀ ö̂ ȫ ö̍ ö̆

R Ṟ ṟ

T Ṯ ṯ

U̶ u̶

Ů ů

U Ú Ù Û Ū U̍ Ŭ u ú ù û ū u̍ ŭ

U͘ Ú͘ Ù͘ Û͘ Ū͘ U̍͘ Ŭ͘ u͘ ú͘ ù͘ û͘ ū͘ u̍͘ ŭ͘

Ṳ Ṳ́ Ṳ̀ Ṳ̂ Ṳ̄ Ṳ̍ ṳ ṳ́ ṳ̀ ṳ̂ ṳ̄ ṳ̍

chhì [O/o + Combining Dot Above Right + tiāuhō]

O͘ Ó͘ Ò͘ Ô͘ Ō͘ O̍͘ Ŏ͘ o͘ ó͘ ò͘ ô͘ ō͘ o̍͘ ŏ͘

chhì [O/o + tiāuhō + Combining Dot Above Right]

O͘ Ó͘ Ò͘ Ô͘ Ō͘ O̍͘ Ŏ͘ o͘ ó͘ ò͘ ô͘ ō͘ o̍͘ ŏ͘

chhì [Dotless i (U+0131)]

ı ı̂ ı̀ ı̂ ı̄ ı̍ ı̆

chhì [khin-siaⁿ (U+00b7)]

Thiaⁿ-·tio̍h ·a.

